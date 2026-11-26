import React from "react";
import {
  InboxOutlined,
  WhatsAppOutlined,
  CheckCircleOutlined,
  StarOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { useTranslation } from "../../i18n/I18nProvider";
import SEO from "../../components/SEO";
import TrackedClick from "../../components/TrackedClick";
import GuidedTourCTA from "../../components/GuidedTourCTA";
import type { EasyPackTier, MovingProcessStep } from "./MovingPage.types";
import {
  PageSection,
  HeroContainer,
  NeonBadge,
  HeroHeading,
  HeroLead,
  ActionsGroup,
  NeonSuccessButton,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  TiersContainer,
  TierCard,
  TierTitle,
  TierSubtitle,
  TierList,
  TierListItem,
  CheckIconSpan,
  ProcessFlex,
  ProcessCard,
  ProcessStepTitle,
  ProcessStepDesc,
  CtaBox,
} from "./MovingPage.styles";

const EASY_PACK_TIERS: EasyPackTier[] = [
  {
    id: "mini",
    badgeKey: "tierMiniBadge",
    titleKey: "tierMiniTitle",
    subtitleKey: "tierMiniSubtitle",
    itemKeys: ["tierMiniItem1", "tierMiniItem2", "tierMiniItem3"],
  },
  {
    id: "standard",
    badgeKey: "tierStandardBadge",
    titleKey: "tierStandardTitle",
    subtitleKey: "tierStandardSubtitle",
    itemKeys: ["tierStandardItem1", "tierStandardItem2", "tierStandardItem3"],
  },
  {
    id: "classic",
    badgeKey: "tierClassicBadge",
    titleKey: "tierClassicTitle",
    subtitleKey: "tierClassicSubtitle",
    itemKeys: ["tierClassicItem1", "tierClassicItem2", "tierClassicItem3"],
    featured: true,
  },
  {
    id: "premium",
    badgeKey: "tierPremiumBadge",
    titleKey: "tierPremiumTitle",
    subtitleKey: "tierPremiumSubtitle",
    itemKeys: ["tierPremiumItem1", "tierPremiumItem2", "tierPremiumItem3"],
    featured: true,
  },
];

const PROCESS_STEPS: MovingProcessStep[] = [
  { id: "p1", titleKey: "step1Title", descKey: "step1Desc" },
  { id: "p2", titleKey: "step2Title", descKey: "step2Desc" },
  { id: "p3", titleKey: "step3Title", descKey: "step3Desc" },
  { id: "p4", titleKey: "step4Title", descKey: "step4Desc" },
];

export const MovingPage: React.FC = () => {
  const { t } = useTranslation();

  const buildWhatsAppLink = () => {
    const msg = t("pages.home.whatsappMovingMessage");
    const base = BRAND_CONFIG.whatsappUrl;
    return base.includes("?")
      ? `${base}&text=${encodeURIComponent(msg)}`
      : `${base}?text=${encodeURIComponent(msg)}`;
  };

  const openWhatsApp = () => {
    window.open(buildWhatsAppLink(), "_blank", "noopener,noreferrer");
  };

  const scrollToTiers = () => {
    const el = document.getElementById("mudanzas-modalidades");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  return (
    <>
      <SEO
        title={t("pages.mudanzas.seoTitle")}
        description={t("pages.mudanzas.seoDescription")}
        keywords={t("pages.mudanzas.seoKeywords")}
        canonicalUrl={`https://${BRAND_CONFIG.domain}/mudanzas`}
      />

      <PageSection id="mudanzas-hero">
        <HeroContainer>
          <NeonBadge>
            <ZnIcon icon={InboxOutlined} />
            <span>{t("pages.mudanzas.heroBadge")}</span>
          </NeonBadge>
          <HeroHeading>{t("pages.mudanzas.heroTitle")}</HeroHeading>
          <HeroLead>{t("pages.mudanzas.heroSubtitle")}</HeroLead>

          <ActionsGroup>
            <TrackedClick
              label="Mudanzas Hero - Ver Modalidades Easy-Pack"
              action="click_explore_mudanzas_tiers"
              category="navigation"
            >
              <NeonSuccessButton onClick={scrollToTiers} variant="primary">
                <span>{t("pages.mudanzas.heroCtaPrimary")}</span>
                <ZnIcon icon={ArrowDownOutlined} />
              </NeonSuccessButton>
            </TrackedClick>
          </ActionsGroup>
        </HeroContainer>
      </PageSection>

      <PageSection id="mudanzas-modalidades" $alternate={true}>
        <SectionHeader>
          <SectionTitle>{t("pages.mudanzas.tiersTitle")}</SectionTitle>
          <SectionSubtitle>{t("pages.mudanzas.tiersSubtitle")}</SectionSubtitle>
        </SectionHeader>

        <TiersContainer>
          {EASY_PACK_TIERS.map((tier) => (
            <TierCard key={tier.id} $featured={tier.featured}>
              <div>
                <NeonBadge $featured={tier.featured}>
                  {tier.featured && <ZnIcon icon={StarOutlined} size={14} />}
                  <span>{t(`pages.mudanzas.${tier.badgeKey}`)}</span>
                </NeonBadge>
              </div>
              <TierTitle>{t(`pages.mudanzas.${tier.titleKey}`)}</TierTitle>
              <TierSubtitle>{t(`pages.mudanzas.${tier.subtitleKey}`)}</TierSubtitle>

              <TierList>
                {tier.itemKeys.map((itemKey) => (
                  <TierListItem key={itemKey}>
                    <CheckIconSpan $featured={tier.featured}>
                      <ZnIcon icon={CheckCircleOutlined} size={16} />
                    </CheckIconSpan>
                    <span>{t(`pages.mudanzas.${itemKey}`)}</span>
                  </TierListItem>
                ))}
              </TierList>
            </TierCard>
          ))}
        </TiersContainer>
      </PageSection>

      <PageSection id="mudanzas-proceso">
        <SectionHeader>
          <SectionTitle>{t("pages.mudanzas.processTitle")}</SectionTitle>
          <SectionSubtitle>{t("pages.mudanzas.processSubtitle")}</SectionSubtitle>
        </SectionHeader>

        <ProcessFlex>
          {PROCESS_STEPS.map((step) => (
            <ProcessCard key={step.id}>
              <ProcessStepTitle>{t(`pages.mudanzas.${step.titleKey}`)}</ProcessStepTitle>
              <ProcessStepDesc>{t(`pages.mudanzas.${step.descKey}`)}</ProcessStepDesc>
            </ProcessCard>
          ))}
        </ProcessFlex>
      </PageSection>

      <PageSection id="mudanzas-cta" $alternate={true}>
        <CtaBox>
          <SectionTitle>{t("pages.mudanzas.ctaTitle")}</SectionTitle>
          <SectionSubtitle>{t("pages.mudanzas.ctaSubtitle")}</SectionSubtitle>
          <TrackedClick
            label="Mudanzas Bottom - Presupuesto WhatsApp"
            action="click_whatsapp_mudanzas_bottom"
            category="conversion"
          >
            <NeonSuccessButton onClick={openWhatsApp} variant="primary">
              <ZnIcon icon={WhatsAppOutlined} />
              <span>{t("pages.mudanzas.ctaButton")}</span>
            </NeonSuccessButton>
          </TrackedClick>
        </CtaBox>
      </PageSection>

      <GuidedTourCTA pageNamespace="mudanzas" />
    </>
  );
};

export default MovingPage;
