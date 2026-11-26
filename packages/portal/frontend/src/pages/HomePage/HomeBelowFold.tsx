import React from "react";
import { SUPPORTED_LOCALES } from "../../i18n";
import { useTranslation } from "../../i18n/I18nProvider";
import { FEATURES } from "@factory/shared/config/features";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { Container } from "@design-sys/atoms/Container";
import TrackedClick from "../../components/TrackedClick";
import {
  ContentSection,
  ContentCard,
} from "../../components/ui/organisms/ConfigPageLayout";
import {
  AudioOutlined,
  SoundOutlined,
  FileTextOutlined,
  MessageOutlined,
  MacCommandOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import {
  VhSection,
  FeaturesInner,
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
  currentFlag: { flag: string; name: string };
  secondLangItem: { flag: string; name: string };
  ctaTitle: string;
  ctaSubtitle: string;
  ctaConfig: { label: React.ReactNode; onClick: () => void };
}

export const HomeBelowFold: React.FC<HomeBelowFoldProps> = ({
  preloadedSections,
  shouldHideInstagramSection,
  socialFeedData,
  isLoadingFeed,
  currentFlag,
  secondLangItem,
  ctaTitle,
  ctaSubtitle,
  ctaConfig,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <VhSection
        id="features"
        $variant="alternate"
        $visible={preloadedSections.has("features")}
      >
        <FeaturesInner>
          <Container maxWidth="lg" padding="none">
            <ContentSection
              title={t("pages.home.features")}
              marginBottom={0}
            >
              <FeaturesRow
                gutter={[24, 24]}
                align="stretch"
                role="presentation"
              >
                <FeatureCol xs={24} sm={12} md={8}>
                  <CardInnerWrapper>
                    <ContentCard
                      className="content-card"
                      $icon={AudioOutlined}
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
                      $icon={SoundOutlined}
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
                      $icon={DesktopOutlined}
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
                      $icon={FileTextOutlined}
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
                      $icon={MessageOutlined}
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
                      $icon={MacCommandOutlined}
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
        $visible={preloadedSections.has("stats")}
      >
        <Container maxWidth="lg">
          <StatsRow gutter={[24, 32]} justify="center" role="presentation">
            <StatCol xs={24} md={8}>
              <StatItem>
                <StatNumber>{SUPPORTED_LOCALES.length}</StatNumber>
                <StatLabel>{t("pages.home.statsIdiomas")}</StatLabel>
                <StatList>
                  <StatListItem>
                    {currentFlag.flag} {currentFlag.name}
                  </StatListItem>
                  <StatListItem>
                    {secondLangItem.flag} {secondLangItem.name}
                  </StatListItem>
                  <StatListItem>
                    {t("pages.home.statsIdiomasOthers")}
                  </StatListItem>
                </StatList>
              </StatItem>
            </StatCol>
            <StatCol xs={24} md={8}>
              <StatItem>
                <StatNumber>100%</StatNumber>
                <StatLabel>{t("pages.home.statsLocal")}</StatLabel>
                <StatList>
                  <StatListItem>
                    {t("pages.home.statsPrivacidadItem1")}
                  </StatListItem>
                  <StatListItem>
                    {t("pages.home.statsPrivacidadItem2")}
                  </StatListItem>
                  <StatListItem>
                    {t("pages.home.statsPrivacidadItem3")}
                  </StatListItem>
                </StatList>
              </StatItem>
            </StatCol>
            <StatCol xs={24} md={8}>
              <StatItem>
                <StatNumber $large>∞</StatNumber>
                <StatLabel>{t("pages.home.statsCompatibilidad")}</StatLabel>
                <StatList>
                  <StatListItem>📱 Móvil</StatListItem>
                  <StatListItem>💻 Escritorio</StatListItem>
                  <StatListItem>🌐 Navegadores</StatListItem>
                </StatList>
              </StatItem>
            </StatCol>
          </StatsRow>
        </Container>
      </VhSection>

      {!shouldHideInstagramSection && (
        <VhSection
          id="testimonials"
          $variant="alternate"
          $visible={preloadedSections.has("testimonials")}
        >
          <Container maxWidth="lg">
            <SectionTitle>{t("pages.home.testimonialsTitle")}</SectionTitle>
            <SectionSubtitle>
              {t("pages.home.testimonialsSubtitle")}
            </SectionSubtitle>
            {FEATURES.ENABLE_SOCIAL_FEEDS ? (
              <React.Suspense fallback={null}>
                <SocialFeedGrid
                  posts={socialFeedData?.feed as never}
                  isLoading={isLoadingFeed}
                  fallbackComponent={
                    <TestimonialsRow gutter={[24, 24]} justify="center" role="presentation">
                      <TestimonialCol xs={24} md={8}>
                        <TestimonialCard>
                          <TestimonialQuote>{t("pages.home.testimonial1")}</TestimonialQuote>
                          <TestimonialAuthor>
                            <TestimonialAvatar>S</TestimonialAvatar>
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
                            <TestimonialAvatar>M</TestimonialAvatar>
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
                            <TestimonialAvatar>Y</TestimonialAvatar>
                            <div>
                              <TestimonialName>{t("pages.home.testimonialName3")}</TestimonialName>
                              <TestimonialRole>{t("pages.home.testimonialRole3")}</TestimonialRole>
                            </div>
                          </TestimonialAuthor>
                        </TestimonialCard>
                      </TestimonialCol>
                    </TestimonialsRow>
                  }
                />
              </React.Suspense>
            ) : (
              <TestimonialsRow gutter={[24, 24]} justify="center" role="presentation">
                <TestimonialCol xs={24} md={8}>
                  <TestimonialCard>
                    <TestimonialQuote>{t("pages.home.testimonial1")}</TestimonialQuote>
                    <TestimonialAuthor>
                      <TestimonialAvatar>S</TestimonialAvatar>
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
                      <TestimonialAvatar>M</TestimonialAvatar>
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
                      <TestimonialAvatar>Y</TestimonialAvatar>
                      <div>
                        <TestimonialName>{t("pages.home.testimonialName3")}</TestimonialName>
                        <TestimonialRole>{t("pages.home.testimonialRole3")}</TestimonialRole>
                      </div>
                    </TestimonialAuthor>
                  </TestimonialCard>
                </TestimonialCol>
              </TestimonialsRow>
            )}
          </Container>
        </VhSection>
      )}

      {BRAND_CONFIG.showMapSection && (
        <VhSection
          id="location"
          $visible={preloadedSections.has("location")}
        >
          <Container maxWidth="lg">
            <SectionTitle>{t("pages.home.locationTitle")}</SectionTitle>
            <SectionSubtitle>
              {t("pages.home.locationSubtitle")}
            </SectionSubtitle>
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

      <VhSection
        id="cta"
        $visible={preloadedSections.has("cta")}
      >
        <Container maxWidth="sm">
          <CtaTitle>{ctaTitle}</CtaTitle>
          <CtaSubtitle>{ctaSubtitle}</CtaSubtitle>
          <TrackedClick label={`Bottom CTA - ${ctaConfig.label}`} action="click_cta" category="marketing">
            <CtaButton variant="primary" onClick={ctaConfig.onClick}>
              {ctaConfig.label}
            </CtaButton>
          </TrackedClick>
        </Container>
      </VhSection>

      <React.Suspense fallback={null}>
        <GuidedTourCTA />
      </React.Suspense>
    </>
  );
};

export default HomeBelowFold;
