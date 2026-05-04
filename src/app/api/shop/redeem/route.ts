export type RedeemInput = {
  balance: number;
  costTokens: number;
};

export function canRedeem(input: RedeemInput): boolean {
  return input.balance >= input.costTokens;
}
