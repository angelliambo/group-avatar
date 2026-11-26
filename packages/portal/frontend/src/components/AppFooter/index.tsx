import React from "react";
import { useTranslation } from "../../i18n/I18nProvider";
import { SUPPORTED_LOCALES } from "../../i18n";
import { LanguageSelector } from "../../i18n/LanguageSelector";
import { ThemeToggle } from "../ThemeToggle";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { InstagramOutlined, FacebookOutlined, TikTokOutlined, XOutlined } from "@ant-design/icons";
import { CONTACT_EMAIL } from "@shared/config/contact";
import {
  PORTAL_URL,
  SHOW_SOCIAL_LINKS,
  SOCIAL_X_URL,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_TIKTOK_URL,
} from "@shared/config/urls";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import pkg from "../../../package.json";
import {
  FooterContainer,
  FooterContent,
  FooterNav,
  FooterLink,
  ExternalLink,
  Separator,
  SocialContainer,
  SocialIconLink,
  CopyRightParagraph,
  FooterLangSelectorWrapper,
} from "./AppFooter.styles";

const AppFooter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterNav>
          <FooterLink to="/commands">
            {t('pages.home.footerCommands')}
          </FooterLink>
          <Separator>•</Separator>
          <ExternalLink href={`mailto:${CONTACT_EMAIL}`}>
            Contáctenos
          </ExternalLink>
          <Separator>•</Separator>
          <FooterLink to="/legal/terms">
            {t('pages.home.footerTerminos')}
          </FooterLink>
          <Separator>•</Separator>
          <FooterLink to="/legal/privacy">
            {t('pages.home.footerPrivacidad')}
          </FooterLink>
        </FooterNav>

        {SHOW_SOCIAL_LINKS && (
          <SocialContainer>
            {SOCIAL_INSTAGRAM_URL && (
              <SocialIconLink
                href={SOCIAL_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <ZnIcon icon={InstagramOutlined} size={20} />
              </SocialIconLink>
            )}
            {SOCIAL_TIKTOK_URL && (
              <SocialIconLink
                href={SOCIAL_TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <ZnIcon icon={TikTokOutlined} size={20} />
              </SocialIconLink>
            )}
            {SOCIAL_FACEBOOK_URL && (
              <SocialIconLink
                href={SOCIAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <ZnIcon icon={FacebookOutlined} size={20} />
              </SocialIconLink>
            )}
            {SOCIAL_X_URL && (
              <SocialIconLink
                href={SOCIAL_X_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X"
              >
                <ZnIcon icon={XOutlined} size={20} />
              </SocialIconLink>
            )}
          </SocialContainer>
        )}

        <FooterLangSelectorWrapper>
          <ThemeToggle variant="icon" />
          {SUPPORTED_LOCALES.length > 1 && (
            <LanguageSelector dropUp={true} />
          )}
        </FooterLangSelectorWrapper>

        <CopyRightParagraph>
          &copy; {new Date().getFullYear()}{" "}
          <ExternalLink href={PORTAL_URL}>{BRAND_CONFIG.siteName}</ExternalLink>.{" "}
          {t('pages.home.footerRights')} &mdash; {t('pages.home.versionLabel')} {pkg.version}
        </CopyRightParagraph>
      </FooterContent>
    </FooterContainer>
  );
};

export default AppFooter;
