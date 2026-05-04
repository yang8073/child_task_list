export type ZhuyinLabel = {
  zh: string;
  bopomofo: string;
};

export type TaskViewModel = {
  id: string;
  title: ZhuyinLabel;
  rewardTokens: number;
  timeOfDay?: string;
  completed: boolean;
};
