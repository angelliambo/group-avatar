export interface EasyPackTier {
  id: string;
  badgeKey: string;
  titleKey: string;
  subtitleKey: string;
  itemKeys: string[];
  featured?: boolean;
}

export interface MovingProcessStep {
  id: string;
  titleKey: string;
  descKey: string;
}
