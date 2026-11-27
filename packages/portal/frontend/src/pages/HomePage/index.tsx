import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  WhatsAppOutlined,
  SafetyCertificateOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { FEATURES } from "@factory/shared/config/features";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { useTranslation } from "../../i18n/I18nProvider";
import { useGetInstagramFeedQuery } from "../../services/api/socialFeedService";
import SEO from "../../components/SEO";
import TrackedClick from "../../components/TrackedClick";
import {
  VhSection,
  HeroContent,
  HeroBadge,
  LogoWrapper,
  Logo,
  HeroTitle,
  HeroTitleNeonSpan,
  HeroSubtitle,
  HeroActions,
  HeroPrimaryButton,
  HeroBannerFrame,
  HeroBannerPicture,
  HeroBannerImage,
  CtaButtonContent,
  ScrollNav,
  ScrollDotWrapper,
  ScrollDot,
  ScrollDotLabel,
} from "./HomePage.styles";

const HomeBelowFold = React.lazy(() => import("./HomeBelowFold"));

interface SectionMeta {
  id: string;
  labelKey: string;
}

const getSections = (shouldHideInstagram: boolean): SectionMeta[] => [
  { id: "hero", labelKey: "scrollHero" },
  { id: "unidades", labelKey: "scrollUnidades" },
  { id: "features", labelKey: "scrollFeatures" },
  { id: "stats", labelKey: "scrollStats" },
  ...(shouldHideInstagram ? [] : [{ id: "testimonials", labelKey: "scrollTestimonials" }]),
  ...(BRAND_CONFIG.showMapSection ? [{ id: "location", labelKey: "scrollLocation" }] : []),
  { id: "cta", labelKey: "scrollCta" },
];

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const [testimonialsInViewport, setTestimonialsInViewport] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("hero");

  const { data: socialFeedData, isLoading: isLoadingFeed } = useGetInstagramFeedQuery(
    undefined,
    {
      skip: !FEATURES.ENABLE_SOCIAL_FEEDS || !testimonialsInViewport,
    }
  );

  const shouldHideInstagramSection =
    FEATURES.ENABLE_SOCIAL_FEEDS && Boolean(socialFeedData?.quotaExceeded);

  const sections = useMemo(
    () => getSections(shouldHideInstagramSection),
    [shouldHideInstagramSection]
  );

  const preloadedSections = useMemo(
    () => new Set(sections.map((s) => s.id)),
    [sections]
  );

  const scrollToSection = useCallback((id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 64;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = Math.max(0, elementPosition - offset);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number | null = null;

    const updateActiveSectionFromScroll = () => {
      rafId = null;
      const scrollY = window.scrollY || window.pageYOffset;

      if (scrollY <= 80) {
        setActiveSectionId("hero");
        return;
      }

      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollY + viewportHeight >= docHeight - 48 && sections.length > 0) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
          setActiveSectionId(lastSection.id);
          return;
        }
      }

      const probeLine = Math.max(120, viewportHeight * 0.42);
      let matchedId = sections[0]?.id || "hero";

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeLine) {
          matchedId = sec.id;
          if (sec.id === "testimonials") {
            setTestimonialsInViewport(true);
          }
        } else {
          break;
        }
      }

      setActiveSectionId(matchedId);
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateActiveSectionFromScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateActiveSectionFromScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [sections]);

  useEffect(() => {
    const handleTourStep = (e: Event) => {
      const customEvent = e as CustomEvent<{ targetId?: string }>;
      if (customEvent.detail?.targetId) {
        setActiveSectionId(customEvent.detail.targetId);
      }
    };
    window.addEventListener("tour:step-changed", handleTourStep);
    return () => window.removeEventListener("tour:step-changed", handleTourStep);
  }, []);

  const buildWhatsAppUrl = useCallback(
    (customMessage?: string) => {
      const base = BRAND_CONFIG.whatsappUrl;
      const msg = customMessage || t("pages.home.whatsappDefaultMessage");
      return base.includes("?")
        ? `${base}&text=${encodeURIComponent(msg)}`
        : `${base}?text=${encodeURIComponent(msg)}`;
    },
    [t]
  );

  const handleOpenWhatsApp = useCallback(() => {
    window.open(buildWhatsAppUrl(), "_blank", "noopener,noreferrer");
  }, [buildWhatsAppUrl]);

  const ctaConfig = {
    label: (
      <CtaButtonContent>
        <ZnIcon icon={WhatsAppOutlined} />
        <span>{t("pages.home.whatsappContactButton")}</span>
      </CtaButtonContent>
    ),
    onClick: handleOpenWhatsApp,
  };

  return (
    <>
      <SEO
        title={t("pages.home.seoTitle")}
        description={t("pages.home.seoDescription")}
        keywords={t("pages.home.seoKeywords")}
        canonicalUrl={`https://${BRAND_CONFIG.domain}/`}
      />

      <ScrollNav aria-label="Navegación por secciones">
        {sections.map((sec) => {
          const isActive = activeSectionId === sec.id;
          const label = t(`pages.home.${sec.labelKey}`);
          return (
            <ScrollDotWrapper key={sec.id}>
              <ScrollDot
                type="button"
                $active={isActive}
                onClick={() => scrollToSection(sec.id)}
                aria-label={label}
              />
              <ScrollDotLabel $active={isActive}>{label}</ScrollDotLabel>
            </ScrollDotWrapper>
          );
        })}
      </ScrollNav>

      <VhSection id="hero" $visible={preloadedSections.has("hero")}>
        <HeroContent>
          <LogoWrapper>
            <Logo
              src={BRAND_CONFIG.logoUrl}
              alt={BRAND_CONFIG.siteName}
              width={240}
              height={179}
              loading="eager"
              fetchPriority="high"
            />
          </LogoWrapper>

          <HeroBadge>
            <ZnIcon icon={SafetyCertificateOutlined} />
            <span>{t("pages.home.heroBadge")}</span>
          </HeroBadge>

          <HeroTitle>
            <span>{t("pages.home.heroTitle")}</span>
            <HeroTitleNeonSpan>{t("pages.home.heroTitleAccent")}</HeroTitleNeonSpan>
          </HeroTitle>

          <HeroSubtitle>{t("pages.home.heroSubtitle")}</HeroSubtitle>

          <HeroActions>
            <TrackedClick
              label="Hero - Explorar Unidades de Negocio"
              action="click_explore_units_hero"
              category="navigation"
            >
              <HeroPrimaryButton
                onClick={() => scrollToSection("unidades")}
                variant="primary"
              >
                <span>{t("pages.home.heroExploreButton")}</span>
                <ZnIcon icon={ArrowDownOutlined} />
              </HeroPrimaryButton>
            </TrackedClick>
          </HeroActions>

          <HeroBannerFrame>
            <HeroBannerPicture>
              <source
                media="(max-width: 768px)"
                srcSet="/assets/images/hero-banner-mobile.webp"
                type="image/webp"
              />
              <HeroBannerImage
                src="/assets/images/hero-banner.webp"
                alt={t("pages.home.heroBannerAlt")}
                width={1024}
                height={576}
                loading="eager"
              />
            </HeroBannerPicture>
          </HeroBannerFrame>
        </HeroContent>
      </VhSection>

      <React.Suspense fallback={null}>
        <HomeBelowFold
          preloadedSections={preloadedSections}
          shouldHideInstagramSection={shouldHideInstagramSection}
          socialFeedData={socialFeedData}
          isLoadingFeed={isLoadingFeed}
          ctaTitle={t("pages.home.ctaTitle")}
          ctaSubtitle={t("pages.home.ctaSubtitleDefault")}
          ctaConfig={ctaConfig}
        />
      </React.Suspense>
    </>
  );
};

export default HomePage;
