import React from "react";
import {
  CarOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  WhatsAppOutlined,
  CheckCircleOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { useTranslation } from "../../i18n/I18nProvider";
import SEO from "../../components/SEO";
import TrackedClick from "../../components/TrackedClick";
import GuidedTourCTA from "../../components/GuidedTourCTA";
import type { LogisticsPillarItem, LogisticsWorkflowStep } from "./LogisticsPage.types";
import {
  PageSection,
  HeroContainer,
  NeonBadge,
  HeroHeading,
  HeroLead,
  ActionsGroup,
  NeonPrimaryButton,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  CardsContainer,
  PillarCard,
  CardTopRow,
  IconBadge,
  CardTitle,
  CardDescription,
  BulletList,
  BulletItem,
  BulletIconWrapper,
  WorkflowFlex,
  WorkflowCard,
  WorkflowStepTitle,
  WorkflowStepDesc,
  CtaBox,
} from "./LogisticsPage.styles";

const PILLARS: LogisticsPillarItem[] = [
  {
    id: "programados",
    badgeKey: "pillar1Badge",
    titleKey: "pillar1Title",
    descKey: "pillar1Desc",
    itemKeys: ["pillar1Item1", "pillar1Item2", "pillar1Item3", "pillar1Item4"],
    accent: "primary",
  },
  {
    id: "repartos",
    badgeKey: "pillar2Badge",
    titleKey: "pillar2Title",
    descKey: "pillar2Desc",
    itemKeys: ["pillar2Item1", "pillar2Item2", "pillar2Item3", "pillar2Item4"],
    accent: "secondary",
  },
  {
    id: "habilitaciones",
    badgeKey: "pillar3Badge",
    titleKey: "pillar3Title",
    descKey: "pillar3Desc",
    itemKeys: ["pillar3Item1", "pillar3Item2", "pillar3Item3", "pillar3Item4"],
    accent: "tertiary",
  },
];

const WORKFLOW_STEPS: LogisticsWorkflowStep[] = [
  { id: "w1", titleKey: "step1Title", descKey: "step1Desc" },
  { id: "w2", titleKey: "step2Title", descKey: "step2Desc" },
  { id: "w3", titleKey: "step3Title", descKey: "step3Desc" },
  { id: "w4", titleKey: "step4Title", descKey: "step4Desc" },
];

export const LogisticsPage: React.FC = () => {
  const { t } = useTranslation();

  const buildWhatsAppLink = () => {
    const msg = t("pages.home.whatsappLogisticsMessage");
    const base = BRAND_CONFIG.whatsappUrl;
    return base.includes("?")
      ? `${base}&text=${encodeURIComponent(msg)}`
      : `${base}?text=${encodeURIComponent(msg)}`;
  };

  const openWhatsApp = () => {
    window.open(buildWhatsAppLink(), "_blank", "noopener,noreferrer");
  };

  const scrollToPillars = () => {
    const el = document.getElementById("logistica-pilares");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  const getPillarIcon = (id: string) => {
    if (id === "repartos") return EnvironmentOutlined;
    if (id === "habilitaciones") return SafetyCertificateOutlined;
    return CarOutlined;
  };

  return (
    <>
      <SEO
        title={t("pages.logistica.seoTitle")}
        description={t("pages.logistica.seoDescription")}
        keywords={t("pages.logistica.seoKeywords")}
        canonicalUrl={`https://${BRAND_CONFIG.domain}/logistica`}
      />

      <PageSection id="logistica-hero">
        <HeroContainer>
          <NeonBadge $tone="primary">
            <ZnIcon icon={CarOutlined} />
            <span>{t("pages.logistica.heroBadge")}</span>
          </NeonBadge>
          <HeroHeading>{t("pages.logistica.heroTitle")}</HeroHeading>
          <HeroLead>{t("pages.logistica.heroSubtitle")}</HeroLead>

          <ActionsGroup>
            <TrackedClick
              label="Logistica Hero - Explorar Soluciones B2B"
              action="click_explore_logistica_pillars"
              category="navigation"
            >
              <NeonPrimaryButton onClick={scrollToPillars} variant="primary">
                <span>{t("pages.logistica.heroCtaPrimary")}</span>
                <ZnIcon icon={ArrowDownOutlined} />
              </NeonPrimaryButton>
            </TrackedClick>
          </ActionsGroup>
        </HeroContainer>
      </PageSection>

      <PageSection id="logistica-pilares" $alternate={true}>
        <SectionHeader>
          <SectionTitle>{t("pages.logistica.pillarsTitle")}</SectionTitle>
          <SectionSubtitle>{t("pages.logistica.pillarsSubtitle")}</SectionSubtitle>
        </SectionHeader>

        <CardsContainer>
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.id} $accent={pillar.accent}>
              <CardTopRow>
                <IconBadge $accent={pillar.accent}>
                  <ZnIcon icon={getPillarIcon(pillar.id)} size={22} />
                </IconBadge>
                <NeonBadge $tone={pillar.accent}>
                  <span>{t(`pages.logistica.${pillar.badgeKey}`)}</span>
                </NeonBadge>
              </CardTopRow>

              <CardTitle>{t(`pages.logistica.${pillar.titleKey}`)}</CardTitle>
              <CardDescription>{t(`pages.logistica.${pillar.descKey}`)}</CardDescription>

              <BulletList>
                {pillar.itemKeys.map((itemKey) => (
                  <BulletItem key={itemKey}>
                    <BulletIconWrapper $accent={pillar.accent}>
                      <ZnIcon icon={CheckCircleOutlined} size={16} />
                    </BulletIconWrapper>
                    <span>{t(`pages.logistica.${itemKey}`)}</span>
                  </BulletItem>
                ))}
              </BulletList>
            </PillarCard>
          ))}
        </CardsContainer>
      </PageSection>

      <PageSection id="logistica-flujo">
        <SectionHeader>
          <SectionTitle>{t("pages.logistica.workflowTitle")}</SectionTitle>
          <SectionSubtitle>{t("pages.logistica.workflowSubtitle")}</SectionSubtitle>
        </SectionHeader>

        <WorkflowFlex>
          {WORKFLOW_STEPS.map((step) => (
            <WorkflowCard key={step.id}>
              <WorkflowStepTitle>{t(`pages.logistica.${step.titleKey}`)}</WorkflowStepTitle>
              <WorkflowStepDesc>{t(`pages.logistica.${step.descKey}`)}</WorkflowStepDesc>
            </WorkflowCard>
          ))}
        </WorkflowFlex>
      </PageSection>

      <PageSection id="logistica-cta" $alternate={true}>
        <CtaBox>
          <SectionTitle>{t("pages.logistica.ctaTitle")}</SectionTitle>
          <SectionSubtitle>{t("pages.logistica.ctaSubtitle")}</SectionSubtitle>
          <TrackedClick
            label="Logistica Bottom - Cotizar WhatsApp"
            action="click_whatsapp_logistica_bottom"
            category="conversion"
          >
            <NeonPrimaryButton onClick={openWhatsApp} variant="primary">
              <ZnIcon icon={WhatsAppOutlined} />
              <span>{t("pages.logistica.ctaButton")}</span>
            </NeonPrimaryButton>
          </TrackedClick>
        </CtaBox>
      </PageSection>

      <GuidedTourCTA pageNamespace="logistica" />
    </>
  );
};

export default LogisticsPage;
