export { cn } from "cn"

/** Small English number words, for counts a sentence reads better spelled out. */
const NUMBER_WORDS = [
  "zero", "one", "two", "three", "four", "five",
  "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
];

/**
 * Spell a small count as a word, so copy can say "ten career tracks" while the
 * figure still comes from the data. Counts above twelve stay as digits.
 */
export function spellOut(n: number): string {
  return NUMBER_WORDS[n] ?? n.toLocaleString();
}

/**
 * Round a count down to a readable milestone and mark it as a floor: 107 reads
 * as "100+". Keeps the claim true as the data grows, and never overstates it.
 */
export function roundDownPlus(n: number): string {
  if (n < 20) return String(n);
  const step = n >= 1000 ? 1000 : n >= 100 ? 100 : 10;
  const floor = Math.floor(n / step) * step;
  return `${floor.toLocaleString()}+`;
}
