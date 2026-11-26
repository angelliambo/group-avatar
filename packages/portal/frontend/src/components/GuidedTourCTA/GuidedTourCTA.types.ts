export interface GuidedTourStep {
  id: string;
  targetId: string;
  speechKey: string;
}

export interface GuidedTourCTAProps {
  whatsappUrl?: string;
  pageNamespace?: "home" | "logistica" | "mudanzas";
  steps?: GuidedTourStep[];
}
