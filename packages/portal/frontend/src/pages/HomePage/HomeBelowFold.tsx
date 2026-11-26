import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "../../i18n/I18nProvider";
import { FEATURES } from "@factory/shared/config/features";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { Container } from "@design-sys/atoms/Container";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import TrackedClick from "../../components/TrackedClick";
import {
  ContentSection,
  ContentCard,
} from "../../components/ui/organisms/ConfigPageLayout";
import {
  CarOutlined,
  EnvironmentOutlined,
  InboxOutlined,
  SafetyCertificateOutlined,
  AimOutlined,
  SolutionOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  HistoryOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  VhSection,
  FeaturesInner,
  VerticalsWrapper,
  VerticalsGrid,
  VerticalCard,
  VerticalCardBody,
  VerticalBadge,
  VerticalTitle,
  VerticalDesc,
  HeroOutlinedButton,
  MapContainer,
  MapFallback,
  TestimonialsRow,
  TestimonialCol,
  TestimonialCard,
  TestimonialQuote,
  TestimonialAuthor,
  TestimonialAvatar,
  TestimonialName,
  TestimonialRole,
  SectionTitle,
  SectionSubtitle,
  CtaCardBox,
  CtaTitle,
  CtaSubtitle,
  CtaButton,
  FeaturesRow,
  FeatureCol,
  CardInnerWrapper,
  StatsRow,
  StatCol,
  StatItem,
  StatNumber,
  StatLabel,
  StatList,
  StatListItem,
  StatCheckIcon,
} from "./HomePage.styles";

const SocialFeedGrid = React.lazy(() =>
  import("@design-sys/atoms/SocialFeed").then((m) => ({ default: m.SocialFeedGrid }))
);
const Map = React.lazy(() =>
  import("@design-sys/atoms/Map").then((module) => ({ default: module.Map }))
);
const GuidedTourCTA = React.lazy(() => import("../../components/GuidedTourCTA"));

export interface HomeBelowFoldProps {
  preloadedSections: Set<string>;
  shouldHideInstagramSection: boolean;
  socialFeedData: { feed?: unknown[] } | undefined;
  isLoadingFeed: boolean;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaConfig: { label: React.ReactNode; onClick: () => void };
}

export const HomeBelowFold: React.FC<HomeBelowFoldProps> = ({
  preloadedSections,
  shouldHideInstagramSection,
  socialFeedData,
  isLoadingFeed,
  ctaTitle,
  ctaSubtitle,
  ctaConfig,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const renderStaticTestimonials = () => (
    <TestimonialsRow gutter={[24, 24]} justify="center" role="presentation">
      <TestimonialCol xs={24} md={8}>
        <TestimonialCard>
          <TestimonialQuote>{t("pages.home.testimonial1")}</TestimonialQuote>
          <TestimonialAuthor>
            <TestimonialAvatar>M</TestimonialAvatar>
            <div>
              <TestimonialName>{t("pages.home.testimonialName1")}</TestimonialName>
              <TestimonialRole>{t("pages.home.testimonialRole1")}</TestimonialRole>
            </div>
          </TestimonialAuthor>
        </TestimonialCard>
      </TestimonialCol>
      <TestimonialCol xs={24} md={8}>
        <TestimonialCard>
          <TestimonialQuote>{t("pages.home.testimonial2")}</TestimonialQuote>
          <TestimonialAuthor>
            <TestimonialAvatar>L</TestimonialAvatar>
            <div>
              <TestimonialName>{t("pages.home.testimonialName2")}</TestimonialName>
              <TestimonialRole>{t("pages.home.testimonialRole2")}</TestimonialRole>
            </div>
          </TestimonialAuthor>
        </TestimonialCard>
      </TestimonialCol>
      <TestimonialCol xs={24} md={8}>
        <TestimonialCard>
          <TestimonialQuote>{t("pages.home.testimonial3")}</TestimonialQuote>
          <TestimonialAuthor>
            <TestimonialAvatar>R</TestimonialAvatar>
            <div>
              <TestimonialName>{t("pages.home.testimonialName3")}</TestimonialName>
              <TestimonialRole>{t("pages.home.testimonialRole3")}</TestimonialRole>
            </div>
          </TestimonialAuthor>
        </TestimonialCard>
      </TestimonialCol>
    </TestimonialsRow>
  );

  return (
    <>
      <VhSection
        id="unidades"
        $variant="alternate"
        $visible={preloadedSections.has("unidades")}
      >
        <VerticalsWrapper>
          <div>
            <SectionTitle>{t("pages.home.verticalsTitle")}</SectionTitle>
            <SectionSubtitle>{t("pages.home.verticalsSubtitle")}</SectionSubtitle>
          </div>

          <VerticalsGrid>
            <VerticalCard $tone="primary">
              <VerticalCardBody>
                <VerticalBadge $tone="primary">
                  <ZnIcon icon={CarOutlined} />
                  <span>{t("pages.home.verticalLogisticsBadge")}</span>
                </VerticalBadge>
                <VerticalTitle>{t("pages.home.verticalLogisticsTitle")}</VerticalTitle>
                <VerticalDesc>{t("pages.home.verticalLogisticsDesc")}</VerticalDesc>
              </VerticalCardBody>
              <TrackedClick
                label="Card Vertical - Ir a Logistica"
                action="click_card_vertical_logistica"
                category="navigation"
              >
                <HeroOutlinedButton
                  $accent="primary"
                  onClick={() => navigate({ to: "/logistica" })}
                  variant="secondary"
                >
                  <span>{t("pages.home.verticalLogisticsCta")}</span>
                  <ZnIcon icon={ArrowRightOutlined} />
                </HeroOutlinedButton>
              </TrackedClick>
            </VerticalCard>

            <VerticalCard $tone="secondary">
              <VerticalCardBody>
                <VerticalBadge $tone="secondary">
                  <ZnIcon icon={InboxOutlined} />
                  <span>{t("pages.home.verticalMovingBadge")}</span>
                </VerticalBadge>
                <VerticalTitle>{t("pages.home.verticalMovingTitle")}</VerticalTitle>
                <VerticalDesc>{t("pages.home.verticalMovingDesc")}</VerticalDesc>
              </VerticalCardBody>
              <TrackedClick
                label="Card Vertical - Ir a Mudanzas"
                action="click_card_vertical_mudanzas"
                category="navigation"
              >
                <HeroOutlinedButton
                  $accent="secondary"
                  onClick={() => navigate({ to: "/mudanzas" })}
                  variant="secondary"
                >
                  <span>{t("pages.home.verticalMovingCta")}</span>
                  <ZnIcon icon={ArrowRightOutlined} />
                </HeroOutlinedButton>
              </TrackedClick>
            </VerticalCard>
          </VerticalsGrid>
        </VerticalsWrapper>
      </VhSection>

      <VhSection id="features" $visible={preloadedSections.has("features")}>
        <FeaturesInner>
          <Container maxWidth="lg" padding="none">
            <ContentSection title={t("pages.home.features")} marginBottom={0}>
              <FeaturesRow gutter={[24, 24]} align="stretch" role="presentation">
                <FeatureCol xs={24} sm={12} md={8}>
                  <CardInnerWrapper>
                    <ContentCard
                      className="content-card"
                      $icon={HistoryOutlined}
                      title={t("pages.home.dictadoTitle")}
                      subtitle={t("pages.home.dictadoDesc")}
                      variant="glass"
                    />
                  </CardInnerWrapper>
                </FeatureCol>
                <FeatureCol xs={24} sm={12} md={8}>
                  <CardInnerWrapper>
                    <ContentCard
                      className="content-card"
                      $icon={EnvironmentOutlined}
                      title={t("pages.home.ttsTitle")}
                      subtitle={t("pages.home.ttsDesc")}
                      variant="glass"
                    />
                  </CardInnerWrapper>
                </FeatureCol>
                <FeatureCol xs={24} sm={12} md={8}>
                  <CardInnerWrapper>
                    <ContentCard
                      className="content-card"
                      $icon={SafetyCertificateOutlined}
                      title={t("pages.home.pipTitle")}
                      subtitle={t("pages.home.pipDesc")}
                      variant="glass"
                    />
                  </CardInnerWrapper>
                </FeatureCol>
                <FeatureCol xs={24} sm={12} md={8}>
                  <CardInnerWrapper>
                    <ContentCard
                      className="content-card"
                      $icon={AimOutlined}
                      title={t("pages.home.pdfTitle")}
                      subtitle={t("pages.home.pdfDesc")}
                      variant="glass"
                    />
                  </CardInnerWrapper>
                </FeatureCol>
                <FeatureCol xs={24} sm={12} md={8}>
                  <CardInnerWrapper>
                    <ContentCard
                      className="content-card"
                      $icon={TeamOutlined}
                      title={t("pages.home.subsTitle")}
                      subtitle={t("pages.home.subsDesc")}
                      variant="glass"
                    />
                  </CardInnerWrapper>
                </FeatureCol>
                <FeatureCol xs={24} sm={12} md={8}>
                  <CardInnerWrapper>
                    <ContentCard
                      className="content-card"
                      $icon={SolutionOutlined}
                      title={t("pages.home.shortcutsTitle")}
                      subtitle={t("pages.home.shortcutsDesc")}
                      variant="glass"
                    />
                  </CardInnerWrapper>
                </FeatureCol>
              </FeaturesRow>
            </ContentSection>
          </Container>
        </FeaturesInner>
      </VhSection>

      <VhSection
        id="stats"
        $variant="alternate"
        $visible={preloadedSections.has("stats")}
      >
        <Container maxWidth="lg">
          <SectionTitle>{t("pages.home.scrollStats")}</SectionTitle>
          <SectionSubtitle>{t("pages.home.heroBadge")}</SectionSubtitle>
          <StatsRow gutter={[24, 32]} justify="center" role="presentation">
            <StatCol xs={24} md={8}>
              <StatItem>
                <StatNumber>{t("pages.home.statsTrayectoriaValue")}</StatNumber>
                <StatLabel>{t("pages.home.statsTrayectoriaLabel")}</StatLabel>
                <StatList>
                  <StatListItem>
                    <StatCheckIcon>
                      <ZnIcon icon={CheckCircleOutlined} size={14} />
                    </StatCheckIcon>
                    <span>{t("pages.home.statsTrayectoriaItem1")}</span>
                  </StatListItem>
                  <StatListItem>
                    <StatCheckIcon>
                      <ZnIcon icon={CheckCircleOutlined} size={14} />
                    </StatCheckIcon>
                    <span>{t("pages.home.statsTrayectoriaItem2")}</span>
                  </StatListItem>
                  <StatListItem>
                    <StatCheckIcon>
                      <ZnIcon icon={CheckCircleOutlined} size={14} />
                    </StatCheckIcon>
                    <span>{t("pages.home.statsTrayectoriaItem3")}</span>
                  </StatListItem>
                </StatList>
              </StatItem>
            </StatCol>
            <StatCol xs={24} md={8}>
              <StatItem>
                <StatNumber>{t("pages.home.statsCoberturaValue")}</StatNumber>
                <StatLabel>{t("pages.home.statsCoberturaLabel")}</StatLabel>
                <StatList>
                  <StatListItem>
                    <StatCheckIcon>
                      <ZnIcon icon={CheckCircleOutlined} size={14} />
                    </StatCheckIcon>
                    <span>{t("pages.home.statsCoberturaItem1")}</span>
                  </StatListItem>
                  <StatListItem>
                    <StatCheckIcon>
                      <ZnIcon icon={CheckCircleOutlined} size={14} />
                    </StatCheckIcon>
                    <span>{t("pages.home.statsCoberturaItem2")}</span>
                  </StatListItem>
                  <StatListItem>
                    <StatCheckIcon>
                      <ZnIcon icon={CheckCircleOutlined} size={14} />
                    </StatCheckIcon>
                    <span>{t("pages.home.statsCoberturaItem3")}</span>
                  </StatListItem>
                </StatList>
              </StatItem>
            </StatCol>
            <StatCol xs={24} md={8}>
              <StatItem>
                <StatNumber>{t("pages.home.statsHabilitacionesValue")}</StatNumber>
                <StatLabel>{t("pages.home.statsHabilitacionesLabel")}</StatLabel>
                <StatList>
                  <StatListItem>
                    <StatCheckIcon>
                      <ZnIcon icon={CheckCircleOutlined} size={14} />
                    </StatCheckIcon>
                    <span>{t("pages.home.statsHabilitacionesItem1")}</span>
                  </StatListItem>
                  <StatListItem>
                    <StatCheckIcon>
                      <ZnIcon icon={CheckCircleOutlined} size={14} />
                    </StatCheckIcon>
                    <span>{t("pages.home.statsHabilitacionesItem2")}</span>
                  </StatListItem>
                  <StatListItem>
                    <StatCheckIcon>
                      <ZnIcon icon={CheckCircleOutlined} size={14} />
                    </StatCheckIcon>
                    <span>{t("pages.home.statsHabilitacionesItem3")}</span>
                  </StatListItem>
                </StatList>
              </StatItem>
            </StatCol>
          </StatsRow>
        </Container>
      </VhSection>

      {!shouldHideInstagramSection && (
        <VhSection
          id="testimonials"
          $visible={preloadedSections.has("testimonials")}
        >
          <Container maxWidth="lg">
            <SectionTitle>{t("pages.home.testimonialsTitle")}</SectionTitle>
            <SectionSubtitle>{t("pages.home.testimonialsSubtitle")}</SectionSubtitle>
            {FEATURES.ENABLE_SOCIAL_FEEDS ? (
              <React.Suspense fallback={null}>
                <SocialFeedGrid
                  posts={socialFeedData?.feed as never}
                  isLoading={isLoadingFeed}
                  fallbackComponent={renderStaticTestimonials()}
                />
              </React.Suspense>
            ) : (
              renderStaticTestimonials()
            )}
          </Container>
        </VhSection>
      )}

      {BRAND_CONFIG.showMapSection && (
        <VhSection
          id="location"
          $variant="alternate"
          $visible={preloadedSections.has("location")}
        >
          <Container maxWidth="lg">
            <SectionTitle>{t("pages.home.locationTitle")}</SectionTitle>
            <SectionSubtitle>{t("pages.home.locationSubtitle")}</SectionSubtitle>
            <MapContainer>
              <React.Suspense fallback={<MapFallback />}>
                <Map
                  $address={BRAND_CONFIG.address}
                  $latitude={BRAND_CONFIG.latitude}
                  $longitude={BRAND_CONFIG.longitude}
                  $zoom={BRAND_CONFIG.mapZoom}
                  $provider="static-image"
                  $mapImageUrl={BRAND_CONFIG.mapImageUrl}
                  $mapMobileImageUrl={BRAND_CONFIG.mapMobileImageUrl}
                  $mapLinkUrl={BRAND_CONFIG.mapLinkUrl}
                />
              </React.Suspense>
            </MapContainer>
          </Container>
        </VhSection>
      )}

      <VhSection id="cta" $visible={preloadedSections.has("cta")}>
        <Container maxWidth="md">
          <CtaCardBox>
            <CtaTitle>{ctaTitle}</CtaTitle>
            <CtaSubtitle>{ctaSubtitle}</CtaSubtitle>
            <TrackedClick
              label="Home Bottom CTA - WhatsApp"
              action="click_whatsapp_home_bottom"
              category="conversion"
            >
              <CtaButton variant="primary" onClick={ctaConfig.onClick}>
                {ctaConfig.label}
              </CtaButton>
            </TrackedClick>
          </CtaCardBox>
        </Container>
      </VhSection>

      <React.Suspense fallback={null}>
        <GuidedTourCTA pageNamespace="home" />
      </React.Suspense>
    </>
  );
};

export default HomeBelowFold;
