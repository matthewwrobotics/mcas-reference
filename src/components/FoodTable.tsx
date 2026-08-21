import { Component, Fragment, useMemo, useState, useId, type ReactNode } from 'react';
import {
  RATING_AXIS_INFO,
  RATING_LABELS,
  type Rating,
  type RatingAxis,
} from '../lib/vocab';
import type { AxisGroup } from '../lib/derive';

export interface FoodRow {
  id: string;
  name: string;
  category: string;
  aliases: string[];
  note?: string;
  lastVerified: string;
  groups: AxisGroup[];
}

export interface SourceInfo {
  name: string;
  url: string;
  redistribution: 'open' | 'link-only';
  linkReason?: string;
}

interface Props {
  foods: FoodRow[];
  sources: Record<string, SourceInfo>;
  axes: RatingAxis[];
}

const RATING_CLASS: Record<Rating, string> = {
  low: 'rating-low',
  moderate: 'rating-moderate',
  high: 'rating-high',
  variable: 'rating-variable',
};

/**
 * The table is server-rendered, so it is readable with no JavaScript at all.
 * The risk this guards against is the opposite case: JavaScript runs, the
 * island throws while hydrating, React unmounts the tree, and the data
 * disappears from a page that was showing it a moment earlier.
 *
 * For a reference table that is the whole point of the page, silently losing
 * the content is the worst possible failure. The boundary falls back to a
 * plain, stateless rendering of exactly the same data — no filters, no expand
 * buttons, nothing that can throw twice.
 */
class TableBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Food table failed to hydrate; showing the static table.', error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function FoodTable(props: Props) {
  return (
    <TableBoundary fallback={<StaticFoodTable {...props} />}>
      <InteractiveFoodTable {...props} />
    </TableBoundary>
  );
}

/** Every rating, every source, no interactivity and no state to go wrong. */
function StaticFoodTable({ foods, sources }: Props) {
  return (
    <div>
      <h2 className="sr-only">Food directory</h2>
      <p className="food-count">
        Showing all {foods.length} foods. Filtering is unavailable in this browser, so
        every source is listed inline instead.
      </p>
      <div className="food-static">
        {foods.map((food) => (
          <section key={food.id} className="food-static-entry">
            <h3>
              {food.name}
              <span className="food-category">{food.category}</span>
            </h3>
            {food.note && <p className="food-note">{food.note}</p>}
            <FoodDetail food={food} sources={sources} axes={food.groups.map((g) => g.axis)} />
          </section>
        ))}
      </div>
    </div>
  );
}

function InteractiveFoodTable({ foods, sources, axes }: Props) {
  const [query, setQuery] = useState('');
  const [axis, setAxis] = useState<RatingAxis | 'all'>('all');
  const [onlyDisagreements, setOnlyDisagreements] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const uid = useId();

  const visibleAxes = axis === 'all' ? axes : [axis];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return foods.filter((food) => {
      if (q) {
        const haystack = [food.name, food.category, ...food.aliases]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      const relevant = food.groups.filter((g) => visibleAxes.includes(g.axis));
      if (axis !== 'all' && relevant.length === 0) return false;
      if (onlyDisagreements && !relevant.some((g) => g.disagreement)) return false;
      return true;
    });
  }, [foods, query, axis, onlyDisagreements, visibleAxes]);

  const groupFor = (food: FoodRow, a: RatingAxis) =>
    food.groups.find((g) => g.axis === a);

  return (
    <div>
      {/* Keeps the heading order h1 → h2 → h3 intact: the per-axis headings in
          the expanded detail rows are h3, and would otherwise skip a level. */}
      <h2 className="sr-only">Food directory</h2>
      <div className="food-controls print-controls">
        <div className="food-control">
          <label htmlFor={`${uid}-q`}>Search foods</label>
          <input
            id={`${uid}-q`}
            type="search"
            value={query}
            placeholder="e.g. spinach"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="food-control">
          <label htmlFor={`${uid}-axis`}>Axis</label>
          <select
            id={`${uid}-axis`}
            value={axis}
            onChange={(e) => setAxis(e.target.value as RatingAxis | 'all')}
          >
            <option value="all">All axes</option>
            {axes.map((a) => (
              <option key={a} value={a}>
                {RATING_AXIS_INFO[a].label}
              </option>
            ))}
          </select>
        </div>

        <div className="food-control food-control-check">
          <input
            id={`${uid}-dis`}
            type="checkbox"
            checked={onlyDisagreements}
            onChange={(e) => setOnlyDisagreements(e.target.checked)}
          />
          <label htmlFor={`${uid}-dis`}>Only where sources disagree</label>
        </div>
      </div>

      <p aria-live="polite" className="food-count">
        {filtered.length} of {foods.length} foods
        {onlyDisagreements ? ' where cited sources give different values' : ''}
      </p>

      <div className="scroll-x">
        <table className="food-table">
          <caption className="sr-only">
            Foods and their ratings on each trigger axis, shown per source. Cells
            marked “sources differ” have more than one published value.
          </caption>
          <thead>
            <tr>
              <th scope="col">Food</th>
              {visibleAxes.map((a) => (
                <th key={a} scope="col" title={RATING_AXIS_INFO[a].definition}>
                  {RATING_AXIS_INFO[a].label}
                </th>
              ))}
              <th scope="col">
                <span className="sr-only">Source detail</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((food) => {
              const isOpen = expanded === food.id;
              return (
                <Fragment key={food.id}>
                  <tr>
                    <th scope="row">
                      <span className="food-name">{food.name}</span>
                      <span className="food-category">{food.category}</span>
                    </th>
                    {visibleAxes.map((a) => (
                      <td key={a}>
                        <AxisCell group={groupFor(food, a)} />
                      </td>
                    ))}
                    <td>
                      <button
                        type="button"
                        className="food-expand"
                        aria-expanded={isOpen}
                        aria-controls={`${uid}-${food.id}`}
                        onClick={() => setExpanded(isOpen ? null : food.id)}
                      >
                        {isOpen ? 'Hide' : 'Sources'}
                      </button>
                    </td>
                  </tr>
                  <tr
                    id={`${uid}-${food.id}`}
                    hidden={!isOpen}
                    className="food-detail-row"
                  >
                    <td colSpan={visibleAxes.length + 2}>
                      <FoodDetail food={food} sources={sources} axes={visibleAxes} />
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="food-empty">
          Nothing matches those filters. The directory is deliberately small — an
          entry appears only once its ratings can be attributed to a named source.
        </p>
      )}
    </div>
  );
}

function AxisCell({ group }: { group?: AxisGroup }) {
  if (!group) return <span className="food-none">—</span>;

  if (group.disagreement) {
    return (
      <span className="badge rating-disagree" title="Cited sources give different values">
        Sources differ
      </span>
    );
  }

  if (group.open.length > 0) {
    const r = group.open[0]!.rating;
    return <span className={`badge ${RATING_CLASS[r]}`}>{RATING_LABELS[r]}</span>;
  }

  return (
    <span className="badge badge-neutral" title="Only a link-only source rates this axis">
      See source
    </span>
  );
}

function FoodDetail({
  food,
  sources,
  axes,
}: {
  food: FoodRow;
  sources: Record<string, SourceInfo>;
  axes: RatingAxis[];
}) {
  const groups = food.groups.filter((g) => axes.includes(g.axis));
  return (
    <div className="food-detail">
      {food.note && <p className="food-note">{food.note}</p>}
      {groups.map((g) => (
        <div key={g.axis} className="food-axis-block">
          <h3>
            {RATING_AXIS_INFO[g.axis].label}
            {g.disagreement && <span className="badge rating-disagree">Sources differ</span>}
          </h3>
          <ul>
            {g.open.map((r) => (
              <li key={`${g.axis}-${r.source}`}>
                <span className={`badge ${RATING_CLASS[r.rating]}`}>
                  {RATING_LABELS[r.rating]}
                </span>{' '}
                <a href={sources[r.source]?.url} rel="noopener">
                  {sources[r.source]?.name ?? r.source}
                </a>
                {r.note && <p className="food-source-note">{r.note}</p>}
              </li>
            ))}
            {g.linkOnly.map((r) => (
              <li key={`${g.axis}-${r.source}-link`}>
                <span className="badge badge-neutral">Not restated here</span>{' '}
                <a href={r.url ?? sources[r.source]?.url} rel="noopener">
                  {sources[r.source]?.name ?? r.source}
                </a>
                <p className="food-source-note">
                  {sources[r.source]?.linkReason ??
                    'Linked rather than restated; see /methodology for this source’s terms.'}
                  {r.note ? ` ${r.note}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
