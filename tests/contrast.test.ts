import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * Colour contrast is asserted here, against the real token values in
 * global.css, because it is the accessibility property most easily broken by an
 * innocent-looking design tweak. Status badges and food ratings still use
 * colour, so a token pair that drops below AA makes real information unreadable
 * for some readers — and text remains the primary channel throughout.
 */

const CSS = readFileSync(
  fileURLToPath(new URL('../src/styles/global.css', import.meta.url)),
  'utf8',
);

/** Tokens declared on bare `:root` — the light theme. */
function lightTokens(): Record<string, string> {
  const blocks = [...CSS.matchAll(/(?:^|\n):root\s*\{([\s\S]*?)\n\}/g)];
  return parse(blocks.map((b) => b[1]!).join('\n'));
}

/** Tokens redeclared inside the dark-scheme media query. */
function darkTokens(): Record<string, string> {
  const base = lightTokens();
  const blocks = [
    ...CSS.matchAll(
      /@media \(prefers-color-scheme: dark\)\s*\{\s*:root\s*\{([\s\S]*?)\n {2}\}/g,
    ),
  ];
  return { ...base, ...parse(blocks.map((b) => b[1]!).join('\n')) };
}

function parse(block: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of block.matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) {
    out[m[1]!] = m[2]!;
  }
  return out;
}

function luminance(hex: string): number {
  const channels = [0, 2, 4].map((i) => parseInt(hex.slice(1 + i, 3 + i), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

function contrast(fg: string, bg: string): number {
  const a = luminance(fg);
  const b = luminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/** Foreground/background token pairs that actually occur in the markup. */
const PAIRS: [string, string][] = [
  ['--text', '--bg'],
  ['--text', '--bg-raised'],
  ['--text-muted', '--bg'],
  ['--text-muted', '--bg-raised'],
  ['--text-muted', '--bg-sunken'],
  ['--text-faint', '--bg'],
  ['--text-faint', '--bg-raised'],
  ['--text-faint', '--bg-sunken'],
  ['--accent-text', '--bg'],
  ['--accent-text', '--bg-raised'],
  ['--flag-fg', '--flag-bg'],
  ['--stale-fg', '--stale-bg'],
  ['--aging-fg', '--aging-bg'],
  ['--rating-low-fg', '--rating-low-bg'],
  ['--rating-moderate-fg', '--rating-moderate-bg'],
  ['--rating-high-fg', '--rating-high-bg'],
  ['--rating-variable-fg', '--rating-variable-bg'],
  ['--rating-disagree-fg', '--rating-disagree-bg'],
];

const AA = 4.5;

for (const [themeName, tokens] of [
  ['light', lightTokens()],
  ['dark', darkTokens()],
] as const) {
  describe(`${themeName} theme contrast`, () => {
    it('defines every token the pairs reference', () => {
      for (const [fg, bg] of PAIRS) {
        expect(tokens[fg], `${fg} missing in ${themeName}`).toBeTruthy();
        expect(tokens[bg], `${bg} missing in ${themeName}`).toBeTruthy();
      }
    });

    for (const [fg, bg] of PAIRS) {
      it(`${fg} on ${bg} meets WCAG AA`, () => {
        const ratio = contrast(tokens[fg]!, tokens[bg]!);
        expect(
          ratio,
          `${fg} on ${bg} is ${ratio.toFixed(2)}:1, below ${AA}:1`,
        ).toBeGreaterThanOrEqual(AA);
      });
    }
  });
}
