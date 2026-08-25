import { useEffect, useMemo, useState } from 'react';

export interface SheetItem {
  id: string;
  section: string;
  name: string;
  mechanismClass: string;
  relationshipLabel: string;
  studyTypeLabels: string[];
  otherEvidence?: string;
  regulatoryLabel: string;
  evidenceLimits?: string;
  trials: { nctId: string; condition: string; statusLabel: string }[];
  citations: { title: string; url: string; pmid?: string }[];
}

interface Props {
  items: SheetItem[];
}

const STORAGE_KEY = 'mcas-appointment-sheet-v1';

interface Stored {
  selected: string[];
  notes: string;
}

function load(): Stored {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { selected: [], notes: '' };
    const parsed = JSON.parse(raw) as Partial<Stored>;
    return {
      selected: Array.isArray(parsed.selected) ? parsed.selected.filter((s) => typeof s === 'string') : [],
      notes: typeof parsed.notes === 'string' ? parsed.notes : '',
    };
  } catch {
    // Private windows, cleared site data, and blocked storage all land here.
    // The page has to work anyway.
    return { selected: [], notes: '' };
  }
}

export default function AppointmentBuilder({ items }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = load();
    setSelected(stored.selected);
    setNotes(stored.notes);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ selected, notes }));
    } catch {
      // Nothing to do — the selection simply will not survive a reload.
    }
  }, [selected, notes, hydrated]);

  const sections = useMemo(() => {
    const map = new Map<string, SheetItem[]>();
    for (const item of items) {
      const list = map.get(item.section) ?? [];
      list.push(item);
      map.set(item.section, list);
    }
    return [...map.entries()];
  }, [items]);

  const chosen = useMemo(
    () => items.filter((i) => selected.includes(i.id)),
    [items, selected],
  );

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="sheet-layout">
      <div className="sheet-picker print-controls">
        <div className="sheet-picker-head">
          <h2>Choose what to bring</h2>
          <button type="button" onClick={() => setSelected([])} disabled={selected.length === 0}>
            Clear
          </button>
        </div>
        <p className="sheet-hint">
          Your selection stays in this browser only. It is never sent anywhere.
        </p>

        {sections.map(([section, list]) => (
          <fieldset key={section}>
            <legend>{section}</legend>
            {list.map((item) => (
              <label key={item.id} className="sheet-option">
                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => toggle(item.id)}
                />
                <span>
                  {item.name}
                  <span className="sheet-option-meta">{item.relationshipLabel}</span>
                </span>
              </label>
            ))}
          </fieldset>
        ))}

        <div className="sheet-notes">
          <label htmlFor="sheet-notes">Questions to ask</label>
          <textarea
            id="sheet-notes"
            rows={4}
            value={notes}
            placeholder="Anything you want to remember to raise."
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="sheet-print"
          onClick={() => window.print()}
          disabled={chosen.length === 0}
        >
          Print this sheet
        </button>
      </div>

      <div className="sheet-output">
        <div className="print-only sheet-print-header">
          <h2>Discussion notes — mast cell activation</h2>
          <p>
            Prepared from a patient-facing reference index. Mechanisms, mast-cell
            relationships and cited study types only; no dosing, and nothing here is a
            recommendation.
          </p>
        </div>

        {chosen.length === 0 ? (
          <p className="sheet-empty print-controls">
            Nothing selected yet. Tick entries on the left and they will appear here,
            formatted to print on paper a clinician can read quickly.
          </p>
        ) : (
          <>
            {notes.trim() && (
              <section className="print-entry sheet-block">
                <h3>Questions to ask</h3>
                <p className="sheet-notes-out">{notes}</p>
              </section>
            )}
            {chosen.map((item) => (
              <section key={item.id} className="print-entry sheet-block">
                <h3>
                  {item.name}
                  <span className="sheet-block-class">{item.mechanismClass}</span>
                </h3>
                <div className="sheet-facts">
                  <p><strong>How it relates to mast cells:</strong> {item.relationshipLabel}</p>
                  <p><strong>Types of studies cited:</strong> {item.studyTypeLabels.join(', ')}</p>
                </div>
                <div className="sheet-context">
                  <p className="sheet-context-markers">
                    <span className="badge badge-neutral">{item.regulatoryLabel}</span>
                  </p>
                  {item.otherEvidence && (
                    <p><strong>Approved or studied conditions:</strong> {item.otherEvidence}</p>
                  )}
                  {item.trials.map((trial) => (
                    <p key={trial.nctId}>
                      <strong>Registered trial:</strong> {trial.nctId} · {trial.condition} · {trial.statusLabel}
                    </p>
                  ))}
                </div>
                {item.evidenceLimits && (
                  <p className="sheet-limits">
                    <strong>What this evidence cannot establish:</strong> {item.evidenceLimits}
                  </p>
                )}
                <ul className="sheet-cites">
                  {item.citations.map((c) => (
                    <li key={c.url}>
                      <a className="citation-link" href={c.url} rel="noopener">
                        {c.title}
                      </a>
                      {c.pmid && <span className="sheet-pmid"> PMID {c.pmid}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
