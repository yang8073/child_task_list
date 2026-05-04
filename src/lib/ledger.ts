export type LedgerEntry = { delta: number };

export function calculateBalance(entries: LedgerEntry[]): number {
  return entries.reduce((sum, entry) => sum + entry.delta, 0);
}
