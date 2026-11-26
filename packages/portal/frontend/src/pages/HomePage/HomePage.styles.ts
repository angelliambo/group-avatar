import styled, { css } from "styled-components";
import Button from "@design-sys/atoms/Button";
import { Row, Col } from "@design-sys/atoms/Grid";

export const VhSection = styled.section<{
  $visible?: boolean;
  $variant?: "default" | "alternate" | "accent";
}>`
  min-height: 92dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
  position: relative;
  z-index: 1;
  background: ${({ $variant, theme }) => {
    if ($variant === "alternate") {
      return theme.colors.background.secondary;
    }
    if ($variant === "accent") {
      return theme.colors.background.tertiary;
    }
    return theme.colors.background.primary;
  }};
  color: ${({ theme }) => theme.colors.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: auto;
    padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.md}`};
  }
`;

export const HeroContent = styled.div`
  max-width: 820px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const HeroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: ${({ theme }) => theme.colors.background.card};
  color: ${({ theme }) => theme.colors.primary[500]};
  border: 1px solid ${({ theme }) => theme.colors.primary[400]};
  box-shadow: ${({ theme }) => theme.effects.glow.primary};
`;

export const LogoWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto ${({ theme }) => theme.spacing.xs};
  width: 104px;
  height: 104px;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 190px;
    height: 190px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      ${({ theme }) => `${theme.colors.primary[500]}38`} 0%,
      ${({ theme }) => `${theme.colors.secondary[500]}18`} 50%,
      transparent 72%
    );
    z-index: 0;
    pointer-events: none;
  }
`;

export const Logo = styled.img`
  position: relative;
  z-index: 1;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border: 2px solid ${({ theme }) => theme.colors.primary[400]};
  box-shadow: ${({ theme }) => theme.effects.glow.primary};
`;

export const HeroTitle = styled.h1`
  font-size: 52px;
  font-weight: 800;
  margin: 0;
  line-height: 1.12;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 34px;
  }
`;

export const HeroTitleNeonSpan = styled.span`
  color: ${({ theme }) => theme.colors.primary[500]};
  text-shadow: 0 0 22px ${({ theme }) => `${theme.colors.primary[500]}66`};
  font-size: 36px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 24px;
  }
`;

export const HeroSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin: 0 auto;
  max-width: 700px;
  line-height: 1.7;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  }
`;

export const HeroActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const neonPrimaryBtnMixin = css`
  background: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: 1px solid ${({ theme }) => theme.colors.primary[400]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};
  min-width: 220px;
  box-shadow: ${({ theme }) => theme.effects.glow.primary};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.effects.glow.premium};
  }
`;

export const HeroPrimaryButton = styled(Button)`
  ${neonPrimaryBtnMixin}
`;

export const HeroOutlinedButton = styled(Button)<{ $accent?: "primary" | "secondary" }>`
  background: ${({ theme }) => theme.colors.background.surface};
  color: ${({ $accent, theme }) =>
    $accent === "secondary" ? theme.colors.secondary[500] : theme.colors.primary[500]};
  border: 1px solid
    ${({ $accent, theme }) =>
      $accent === "secondary" ? theme.colors.secondary[400] : theme.colors.primary[400]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  min-width: 220px;
  box-shadow: ${({ $accent, theme }) =>
    $accent === "secondary" ? theme.effects.glow.success : theme.effects.glow.primary};
  transition: transform ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
  }
`;

export const FeaturesInner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const VerticalsWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const VerticalsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: stretch;
`;

export const VerticalCard = styled.article<{ $tone: "primary" | "secondary" }>`
  flex: 1 1 380px;
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid
    ${({ $tone, theme }) =>
      $tone === "secondary" ? theme.colors.secondary[400] : theme.colors.primary[400]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ $tone, theme }) =>
    $tone === "secondary" ? theme.effects.glow.success : theme.effects.glow.primary};
  transition: transform ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

export const VerticalCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const VerticalBadge = styled.span<{ $tone: "primary" | "secondary" }>`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ $tone, theme }) =>
    $tone === "secondary" ? theme.colors.secondary[500] : theme.colors.primary[500]};
  border: 1px solid
    ${({ $tone, theme }) =>
      $tone === "secondary" ? theme.colors.secondary[400] : theme.colors.primary[400]};
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const VerticalTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const VerticalDesc = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.65;
  margin: 0;
`;

export const FeaturesRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
`;

export const FeatureCol = styled(Col)`
  display: flex;
`;

export const CardInnerWrapper = styled.div`
  flex: 1;
  display: flex;
`;

export const CtaButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const MapContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.primary[400]};
  box-shadow: ${({ theme }) => theme.effects.glow.primary};
`;

export const TestimonialsRow = styled(Row)`
  max-width: 1100px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.xl} auto 0;
`;

export const TestimonialCol = styled(Col)`
  display: flex;
`;

export const TestimonialCard = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.primary[400]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: left;
  box-shadow: ${({ theme }) => theme.effects.glow.primary};
  transition: transform ${({ theme }) => theme.transitions.normal};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};

  &:hover {
    transform: translateY(-4px);
  }
`;

export const TestimonialQuote = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
  margin: 0;
  font-style: italic;

  &::before {
    content: '"';
  }
  &::after {
    content: '"';
  }
`;

export const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TestimonialAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.inverse};
  box-shadow: ${({ theme }) => theme.effects.glow.primary};
`;

export const TestimonialName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TestimonialRole = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-shadow: 0 0 18px ${({ theme }) => `${theme.colors.primary[500]}40`};
  margin: 0 auto ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;

export const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.65;
`;

export const CtaCardBox = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.secondary[400]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  box-shadow: ${({ theme }) => theme.effects.glow.success};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CtaTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  text-align: center;
`;

export const CtaSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 auto ${({ theme }) => theme.spacing.sm};
  max-width: 540px;
  text-align: center;
  line-height: 1.65;
`;

export const CtaButton = styled(Button)`
  background: ${({ theme }) => theme.colors.secondary[500]};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: 1px solid ${({ theme }) => theme.colors.secondary[400]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  box-shadow: ${({ theme }) => theme.effects.glow.success};
  min-width: 260px;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
  }
`;

export const MapFallback = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

export const StatsRow = styled(Row)`
  max-width: 1080px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.xl} auto 0;
`;

export const StatCol = styled(Col)`
  display: flex;
  justify-content: center;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.tertiary[400]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  box-shadow: ${({ theme }) => theme.effects.glow.premium};
`;

export const StatNumber = styled.span`
  font-size: 46px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.tertiary[500]};
  text-shadow: 0 0 18px ${({ theme }) => `${theme.colors.tertiary[500]}66`};
  line-height: 1.1;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const StatList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const StatListItem = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StatCheckIcon = styled.span`
  color: ${({ theme }) => theme.colors.tertiary[500]};
  display: inline-flex;
`;

/* Bullets de navegación lateral (ScrollNav) */
export const ScrollNav = styled.nav`
  position: fixed;
  right: ${({ theme }) => theme.spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  z-index: ${({ theme }) => theme.zIndex.sticky};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.sm}`};
  background: ${({ theme }) => theme.effects.glassBackground};
  border: 1px solid ${({ theme }) => theme.colors.primary[400]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.effects.glow.primary};
  backdrop-filter: blur(10px);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const ScrollDotWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const ScrollDot = styled.button<{ $active?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary[500] : theme.colors.text.tertiary};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary[500] : "transparent"};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  padding: 0;
  transform: ${({ $active }) => ($active ? "scale(1.35)" : "scale(1)")};
  box-shadow: ${({ $active, theme }) =>
    $active ? theme.effects.glow.primary : "none"};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[400]};
    background: ${({ theme }) => theme.colors.primary[400]};
    transform: scale(1.25);
  }
`;

export const ScrollDotLabel = styled.span<{ $active?: boolean }>`
  position: absolute;
  right: 26px;
  top: 50%;
  transform: translateY(-50%);
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary[500] : theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.primary[400]};
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.effects.glow.primary};
  white-space: nowrap;
  pointer-events: none;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.transitions.fast};

  ${ScrollDot}:hover + & {
    opacity: 1;
  }
`;
