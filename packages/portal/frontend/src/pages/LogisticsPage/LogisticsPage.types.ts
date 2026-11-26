export interface LogisticsPillarItem {
  id: string;
  badgeKey: string;
  titleKey: string;
  descKey: string;
  itemKeys: string[];
  accent: "primary" | "secondary" | "tertiary";
}

export interface LogisticsWorkflowStep {
  id: string;
  titleKey: string;
  descKey: string;
}
