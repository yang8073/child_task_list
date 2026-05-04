export type ToggleTaskInput = {
  childId: string;
  taskTemplateId: string;
  date: string;
  currentlyCompleted: boolean;
  rewardTokens: number;
};

export type ToggleTaskResult = {
  nextCompleted: boolean;
  ledgerDelta: number;
  reason: "TASK_COMPLETE" | "TASK_UNDO";
};

export function toggleTaskCompletion(input: ToggleTaskInput): ToggleTaskResult {
  const nextCompleted = !input.currentlyCompleted;

  if (nextCompleted) {
    return {
      nextCompleted,
      ledgerDelta: input.rewardTokens,
      reason: "TASK_COMPLETE"
    };
  }

  return {
    nextCompleted,
    ledgerDelta: -input.rewardTokens,
    reason: "TASK_UNDO"
  };
}
