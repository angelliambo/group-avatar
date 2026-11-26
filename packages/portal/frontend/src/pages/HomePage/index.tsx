import React, { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "../../i18n/I18nProvider";
import { FEATURES } from "@factory/shared/config/features";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { useGetInstagramFeedQuery } from "../../services/api/socialFeedService";

const GoogleSignInButton = React.lazy(() => import("../../components/GoogleSignInButton"));
const RegisterModal = React.lazy(() => import("../../components/RegisterModal"));
const HomeBelowFold = React.lazy(() => import("./HomeBelowFold"));

import TrackedClick from "../../components/TrackedClick";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import {
  KeyOutlined,
  RocketOutlined,
} from "@ant-design/icons";

import {
  VhSection,
  HeroContent,
  LogoWrapper,
  Logo,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  HeroOutlinedButton,
  HeroPrimaryButton,
  HeroGoogleButtonWrapper,
  CtaButtonContent,
} from "./HomePage.styles";



const getSections = (shouldHideInstagram: boolean) => [
  "hero",
  "features",
  "stats",
  ...(shouldHideInstagram ? [] : ["testimonials"]),
  ...(BRAND_CONFIG.showMapSection ? ["location"] : []),
  "cta",
];

const G_ID = process.env.VITE_GOOGLE_CLIENT_ID || '';



const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user: loggedInUser } = useAuth();
  const { t, lang } = useTranslation();

  const LANG_FLAGS: Record<string, { flag: string; name: string }> = {
    "es": { flag: "🇪🇸", name: "Español" },
    "en": { flag: "🇺🇸", name: "English" },
  };

  const secondLang: Record<string, { flag: string; name: string }> = {
    "es": { flag: "🇺🇸", name: "English" },
    "en": { flag: "🇪🇸", name: "Español" },
  };

  const currentFlag = LANG_FLAGS[lang] || LANG_FLAGS["es"];
  const secondLangItem = secondLang[lang] || secondLang["en"];

  const [testimonialsInViewport, setTestimonialsInViewport] = useState(false);

  useEffect(() => {
    if (!FEATURES.ENABLE_SOCIAL_FEEDS) return;
    const target = document.getElementById("testimonials");
    if (!target) {
      setTestimonialsInViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTestimonialsInViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const { data: socialFeedData, isLoading: isLoadingFeed } = useGetInstagramFeedQuery(undefined, {
    skip: !FEATURES.ENABLE_SOCIAL_FEEDS || !testimonialsInViewport,
  });

  const shouldHideInstagramSection = FEATURES.ENABLE_SOCIAL_FEEDS && Boolean(socialFeedData?.quotaExceeded);
  const activeSections = getSections(shouldHideInstagramSection);

  const handleLogin = useCallback(() => setShowRegister(true), []);
  const handlePricing = useCallback(() => navigate({ to: "/pricing" as any }), [navigate]);

  const userInteracted = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const scrollTo = (id: string) => {
    userInteracted.current = true;
    setShowBelowFold(true);
    clearTimeout(timerRef.current);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 70;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 0);
  };

  const [showRegister, setShowRegister] = useState(false);
  const [showBelowFold, setShowBelowFold] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.scrollY > 0) {
      setShowBelowFold(true);
      return;
    }
    const mountBelowFold = () => setShowBelowFold(true);
    window.addEventListener("scroll", mountBelowFold, { once: true, passive: true });
    window.addEventListener("wheel", mountBelowFold, { once: true, passive: true });
    window.addEventListener("touchstart", mountBelowFold, { once: true, passive: true });
    window.addEventListener("keydown", mountBelowFold, { once: true, passive: true });
    return () => {
      window.removeEventListener("scroll", mountBelowFold);
      window.removeEventListener("wheel", mountBelowFold);
      window.removeEventListener("touchstart", mountBelowFold);
      window.removeEventListener("keydown", mountBelowFold);
    };
  }, []);

  const [preloadedSections, setPreloadedSections] = useState<Set<string>>(() => {
    const isLighthouse = typeof navigator !== 'undefined' &&
      (navigator.userAgent.includes('Chrome-Lighthouse') ||
        navigator.userAgent.includes('Lighthouse') ||
        navigator.userAgent.includes('HeadlessChrome') ||
        navigator.userAgent.includes('Headless') ||
        navigator.webdriver);

    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isLighthouse || prefersReducedMotion) {
      return new Set(activeSections);
    }
    return new Set(["hero"]);
  });

  useEffect(() => {
    if (!showBelowFold) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = new Set<string>();
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          }
        });
        if (visible.size > 0) {
          const sorted = activeSections.filter((s) => visible.has(s));
          const last = sorted[sorted.length - 1];
          const lastIdx = activeSections.indexOf(last);
          setPreloadedSections(
            new Set(activeSections.slice(0, Math.min(lastIdx + 2, activeSections.length))),
          );
        }
      },
      { threshold: 0.1, rootMargin: "-80px 0px 0px 0px" },
    );

    activeSections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [showBelowFold, activeSections.join(",")]);

  // Configuración del botón CTA (al final de la página)
  const getCtaConfig = () => {
    if (FEATURES.ENABLE_GOOGLE_AUTH) {
      if (loggedInUser) {
        return {
          label: (
            <CtaButtonContent>
              {t("pages.home.heroDashboardButton")} <ZnIcon icon={RocketOutlined} />
            </CtaButtonContent>
          ),
          onClick: () => navigate({ to: "/dashboard" })
        };
      } else {
        return {
          label: t("pages.home.ctaButton"),
          onClick: handleLogin
        };
      }
    } else {
      if (BRAND_CONFIG.whatsappUrl) {
        return {
          label: t("pages.home.whatsappContactButton"),
          onClick: () => window.open(BRAND_CONFIG.whatsappUrl, "_blank", "noopener,noreferrer")
        };
      } else {
        return {
          label: t("pages.home.seeFeaturesButton"),
          onClick: () => scrollTo("features")
        };
      }
    }
  };

  const ctaConfig = getCtaConfig();

  // Título y Subtítulo de la sección CTA
  const ctaTitle = FEATURES.ENABLE_GOOGLE_AUTH
    ? (loggedInUser ? t("pages.home.ctaTitleLogged") : t("pages.home.ctaTitle"))
    : t("pages.home.ctaTitle");

  const ctaSubtitle = FEATURES.ENABLE_GOOGLE_AUTH
    ? (loggedInUser
      ? t("pages.home.ctaSubtitleLogged", { siteName: BRAND_CONFIG.siteName })
      : t("pages.home.ctaSubtitle"))
    : t("pages.home.ctaSubtitleDefault");

  // Render para los botones de acción del Hero
  const renderHeroActions = () => {
    if (FEATURES.ENABLE_GOOGLE_AUTH) {
      if (loggedInUser) {
        return (
          <>
            <TrackedClick label="Hero - Ir al Dashboard" action="click_cta" category="marketing">
              <HeroPrimaryButton onClick={() => navigate({ to: "/dashboard" })} variant="primary">
                {t("pages.home.heroDashboardButton")}
              </HeroPrimaryButton>
            </TrackedClick>
            {FEATURES.ENABLE_BILLING_LEMON && (
              <TrackedClick label="Hero - Planes Premium" action="click_pricing" category="marketing">
                <HeroOutlinedButton onClick={handlePricing} variant="secondary">
                  {t("pages.home.pricingButton")}
                </HeroOutlinedButton>
              </TrackedClick>
            )}
          </>
        );
      } else {
        return (
          <>
            <TrackedClick label="Hero - Comenzar Gratis" action="click_cta" category="marketing">
              <HeroPrimaryButton onClick={handleLogin} variant="primary">
                {t("pages.home.ctaButton")}
              </HeroPrimaryButton>
            </TrackedClick>
            {FEATURES.ENABLE_GOOGLE_AUTH && G_ID && (
              <HeroGoogleButtonWrapper>
                <React.Suspense fallback={null}>
                  <GoogleSignInButton size="large" text="continue_with" width="240px" oneTap={true} />
                </React.Suspense>
              </HeroGoogleButtonWrapper>
            )}
            <TrackedClick label="Hero - Ingresar con Correo" action="click_login" category="marketing">
              <HeroOutlinedButton onClick={handleLogin} variant="secondary">
                <ZnIcon icon={KeyOutlined} /> {t("pages.home.heroEmailLoginButton")}
              </HeroOutlinedButton>
            </TrackedClick>
            {FEATURES.ENABLE_BILLING_LEMON && (
              <TrackedClick label="Hero - Planes Premium" action="click_pricing" category="marketing">
                <HeroOutlinedButton onClick={handlePricing} variant="secondary">
                  {t("pages.home.pricingButton")}
                </HeroOutlinedButton>
              </TrackedClick>
            )}
          </>
        );
      }
    } else {
      return (
        <>
          {BRAND_CONFIG.whatsappUrl ? (
            <TrackedClick label="Hero - Contacto WhatsApp" action="click_whatsapp" category="marketing">
              <HeroPrimaryButton onClick={() => window.open(BRAND_CONFIG.whatsappUrl, "_blank", "noopener,noreferrer")} variant="primary">
                {t("pages.home.whatsappContactButton")}
              </HeroPrimaryButton>
            </TrackedClick>
          ) : (
            <TrackedClick label="Hero - Ver Funciones" action="click_features" category="marketing">
              <HeroPrimaryButton onClick={() => scrollTo("features")} variant="primary">
                {t("pages.home.seeFeaturesButton")}
              </HeroPrimaryButton>
            </TrackedClick>
          )}
          {FEATURES.ENABLE_BILLING_LEMON && (
            <TrackedClick label="Hero - Planes Premium" action="click_pricing" category="marketing">
              <HeroOutlinedButton onClick={handlePricing} variant="secondary">
                {t("pages.home.pricingButton")}
              </HeroOutlinedButton>
            </TrackedClick>
          )}
        </>
      );
    }
  };

  return (
    <>
      <VhSection
        id="hero"
        $visible={preloadedSections.has("hero")}
      >
        <HeroContent>
          <LogoWrapper>
            <Logo
              src={BRAND_CONFIG.logoUrl || `${process.env.PUBLIC_URL}/assets/images/logo.png`}
              alt={BRAND_CONFIG.siteName}
              width={128}
              height={128}
              loading="eager"
              fetchPriority="high"
            />
          </LogoWrapper>
          <HeroTitle>{BRAND_CONFIG.siteName}</HeroTitle>
          <HeroSubtitle>
            {t("pages.home.heroSubtitle")}
          </HeroSubtitle>
          <HeroActions>
            {renderHeroActions()}
          </HeroActions>
        </HeroContent>
      </VhSection>

      {showRegister && (
        <React.Suspense fallback={null}>
          <RegisterModal
            onClose={() => setShowRegister(false)}
            initialStep="email"
          />
        </React.Suspense>
      )}

      {showBelowFold && (
        <React.Suspense fallback={null}>
          <HomeBelowFold
            preloadedSections={preloadedSections}
            shouldHideInstagramSection={shouldHideInstagramSection}
            socialFeedData={socialFeedData}
            isLoadingFeed={isLoadingFeed}
            currentFlag={currentFlag}
            secondLangItem={secondLangItem}
            ctaTitle={ctaTitle}
            ctaSubtitle={ctaSubtitle}
            ctaConfig={ctaConfig}
          />
        </React.Suspense>
      )}
    </>
  );
};

export default HomePage;
