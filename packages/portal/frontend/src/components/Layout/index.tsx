import React, { useState, useEffect, lazy, Suspense } from "react";
import { Outlet, useLocation } from "@tanstack/react-router";
import { LanguageSelector } from "../../i18n/LanguageSelector";
import { ThemeToggle } from "../ThemeToggle";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { SUPPORTED_LOCALES, useTranslation } from "../../i18n";
import { usePageTracking } from "../../hooks/usePageTracking";
import {
  LayoutRoot,
  TopBar,
  NavLinks,
  DesktopRight,
  HamburgerButton,
  MobileSidebar,
  SidebarOverlay,
  SidebarHeader,
  CloseButton,
  SidebarNav,
  SidebarNavLink,
  NavLink,
  LogoLink,
  MainContent,
  InnerContentContainer,
  MobileActionsWrapper,
  MobileHeaderActions,
  PreferencesSection,
  PreferenceRow,
} from "./Layout.styles";

const AppFooter = lazy(() => import("../AppFooter"));
const FloatingWhatsAppCTA = lazy(() => import("../FloatingWhatsAppCTA"));

const Layout: React.FC = React.memo(() => {
  usePageTracking();
  const location = useLocation();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const getContextualWhatsAppMessage = () => {
    if (location.pathname.startsWith("/logistica")) {
      return t("pages.home.whatsappLogisticsMessage");
    }
    if (location.pathname.startsWith("/mudanzas")) {
      return t("pages.home.whatsappMovingMessage");
    }
    return t("pages.home.whatsappDefaultMessage");
  };

  return (
    <LayoutRoot>
      <TopBar>
        <LogoLink to="/">{BRAND_CONFIG.siteName}</LogoLink>

        <NavLinks>
          <NavLink to="/" $active={location.pathname === "/"}>
            {t("pages.navigation.labelHome")}
          </NavLink>
          <NavLink
            to="/logistica"
            $active={location.pathname.startsWith("/logistica")}
          >
            {t("pages.navigation.labelLogistics")}
          </NavLink>
          <NavLink
            to="/mudanzas"
            $active={location.pathname.startsWith("/mudanzas")}
          >
            {t("pages.navigation.labelMoving")}
          </NavLink>
        </NavLinks>

        <DesktopRight>
          <ThemeToggle variant="icon" />
          {SUPPORTED_LOCALES.length > 1 && <LanguageSelector />}
        </DesktopRight>

        <MobileHeaderActions>
          <ThemeToggle variant="icon" />
          <HamburgerButton
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label={t("pages.navigation.ariaOpen")}
          >
            <ZnIcon icon={MenuOutlined} />
          </HamburgerButton>
        </MobileHeaderActions>
      </TopBar>

      {isMobileMenuOpen && (
        <>
          <SidebarOverlay
            $open={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <MobileSidebar $open={isMobileMenuOpen}>
            <SidebarHeader>
              <LogoLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
                {BRAND_CONFIG.siteName}
              </LogoLink>
              <CloseButton
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={t("pages.navigation.ariaClose")}
              >
                <ZnIcon icon={CloseOutlined} />
              </CloseButton>
            </SidebarHeader>

            <SidebarNav>
              <SidebarNavLink
                to="/"
                $active={location.pathname === "/"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("pages.navigation.labelHome")}
              </SidebarNavLink>
              <SidebarNavLink
                to="/logistica"
                $active={location.pathname.startsWith("/logistica")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("pages.navigation.labelLogistics")}
              </SidebarNavLink>
              <SidebarNavLink
                to="/mudanzas"
                $active={location.pathname.startsWith("/mudanzas")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("pages.navigation.labelMoving")}
              </SidebarNavLink>
            </SidebarNav>

            <MobileActionsWrapper>
              <PreferencesSection>
                <PreferenceRow>
                  <span>{t("pages.navigation.labelTheme")}</span>
                  <ThemeToggle variant="row" />
                </PreferenceRow>

                {SUPPORTED_LOCALES.length > 1 && (
                  <PreferenceRow>
                    <LanguageSelector dropUp={true} />
                  </PreferenceRow>
                )}
              </PreferencesSection>
            </MobileActionsWrapper>
          </MobileSidebar>
        </>
      )}

      <MainContent>
        <InnerContentContainer maxWidth="full" padding="none">
          <Outlet />
        </InnerContentContainer>
      </MainContent>

      <Suspense fallback={null}>
        <AppFooter />
        <FloatingWhatsAppCTA
          defaultMessage={getContextualWhatsAppMessage()}
          delayMs={300}
        />
      </Suspense>
    </LayoutRoot>
  );
});

Layout.displayName = "Layout";

export default Layout;
