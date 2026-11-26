import React from "react";
import { useResponsive } from "../../hooks/useResponsive";
import { useTranslation } from "../../i18n/I18nProvider";
import { SafetyOutlined } from "@ant-design/icons";
import { ZnIcon } from "@shared/design-sys/atoms/ZnIcon";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  IconContainer,
  ModalBody,
  ModalFooter,
  InfoBox,
  LinkStyled,
  TitleStyled,
  BodyTextPrimary,
  BodyTextSecondary,
  StyledList,
  ListItem,
  InfoText,
  FooterText,
  FooterButton,
} from "./CookieModal.styles";

interface CookieModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onReject: () => void;
  onClose?: () => void;
}

export const CookieModal: React.FC<CookieModalProps> = ({
  isOpen,
  onAccept,
  onReject,
  onClose,
}) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  const handleAccept = () => {
    onAccept();
    if (onClose) onClose();
  };

  const handleReject = () => {
    onReject();
    if (onClose) onClose();
  };

  return (
    <Overlay $isOpen={isOpen} onClick={onClose}>
      <ModalContainer
        $isOpen={isOpen}
        variant="elevated"
        size="lg"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <IconContainer>
            <ZnIcon icon={SafetyOutlined} />
          </IconContainer>
          <TitleStyled
            level={3}
            $isMobile={isMobile}
          >
            {t("pages.cookie.title")}
          </TitleStyled>
        </ModalHeader>

        <ModalBody $isMobile={isMobile}>
          <BodyTextPrimary
            variant="body1"
            $isMobile={isMobile}
          >
            {t("pages.cookie.intro", { siteName: BRAND_CONFIG.siteName })}
          </BodyTextPrimary>

          <BodyTextSecondary
            variant="body2"
            $isMobile={isMobile}
          >
            <strong>{t("pages.cookie.whyImportant")}</strong>
          </BodyTextSecondary>

          <StyledList $isMobile={isMobile}>
            <ListItem>
              <strong>{t("pages.cookie.reasonEssential")}</strong> {t("pages.cookie.reasonEssentialDesc")}
            </ListItem>
            <ListItem>
              <strong>{t("pages.cookie.reasonPersonalization")}</strong> {t("pages.cookie.reasonPersonalizationDesc")}
            </ListItem>
            <ListItem>
              <strong>{t("pages.cookie.reasonImprovements")}</strong> {t("pages.cookie.reasonImprovementsDesc")}
            </ListItem>
            <ListItem>
              <strong>{t("pages.cookie.reasonSecurity")}</strong> {t("pages.cookie.reasonSecurityDesc")}
            </ListItem>
          </StyledList>

          <InfoBox>
            <InfoText
              variant="body2"
              $isMobile={isMobile}
            >
              <strong>{t("pages.cookie.importantLabel")}</strong> {t("pages.cookie.importantMessage")}
            </InfoText>
          </InfoBox>

          <FooterText
            variant="body2"
            $isMobile={isMobile}
          >
            {t("pages.cookie.readMore")}{" "}
            <LinkStyled to="/legal/cookies">
              {t("pages.cookie.policyLink")}
            </LinkStyled>
          </FooterText>
        </ModalBody>

        <ModalFooter $isMobile={isMobile}>
          <FooterButton
            variant="outlined"
            size={isMobile ? "md" : "lg"}
            onClick={handleReject}
            fullWidth={isMobile}
            $isMobile={isMobile}
          >
            {t("pages.cookie.rejectButton")}
          </FooterButton>
          <FooterButton
            variant="primary"
            size={isMobile ? "md" : "lg"}
            onClick={handleAccept}
            fullWidth={isMobile}
            $isMobile={isMobile}
          >
            {t("pages.cookie.acceptButton")}
          </FooterButton>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};
