import styled from "styled-components";
import Button from "@design-sys/atoms/Button";

export const PageSection = styled.section<{ $alternate?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.lg}`};
  background: ${({ $alternate, theme }) =>
    $alternate ? theme.colors.background.secondary : theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
  }
`;

export const HeroContainer = styled.div`
  max-width: 920px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.xxl} 0`};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const NeonBadge = styled.span<{ $featured?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: ${({ theme }) => theme.effects.glassBackground};
  color: ${({ $featured, theme }) =>
    $featured ? theme.colors.tertiary[500] : theme.colors.secondary[500]};
  border: 1px solid
    ${({ $featured, theme }) =>
      $featured ? theme.colors.tertiary[400] : theme.colors.secondary[400]};
  box-shadow: ${({ $featured, theme }) =>
    $featured ? theme.effects.glow.premium : theme.effects.glow.success};
`;

export const HeroHeading = styled.h1`
  font-size: 46px;
  font-weight: 800;
  line-height: 1.15;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  text-shadow: 0 0 22px ${({ theme }) => `${theme.colors.secondary[500]}55`};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 32px;
  }
`;

export const HeroLead = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 720px;
  line-height: 1.65;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  }
`;

export const ActionsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  align-items: center;
`;

export const NeonSuccessButton = styled(Button)`
  background: ${({ theme }) => theme.colors.secondary[500]};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: 1px solid ${({ theme }) => theme.colors.secondary[400]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  box-shadow: ${({ theme }) => theme.effects.glow.success};
  min-width: 240px;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.effects.glow.premium};
  }
`;

export const NeonOutlineButton = styled(Button)`
  background: ${({ theme }) => theme.effects.glassBackground};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary[400]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  box-shadow: ${({ theme }) => theme.effects.glow.primary};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
  }
`;

export const SectionHeader = styled.div`
  max-width: 760px;
  margin: 0 auto ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.6;
`;

export const TiersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: stretch;
`;

export const TierCard = styled.article<{ $featured?: boolean }>`
  flex: 1 1 260px;
  background: ${({ theme }) => theme.colors.background.card};
  border: ${({ $featured }) => ($featured ? "2px" : "1px")} solid
    ${({ $featured, theme }) =>
      $featured ? theme.colors.tertiary[400] : theme.colors.secondary[400]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ $featured, theme }) =>
    $featured ? theme.effects.glow.premium : theme.effects.glow.success};
  transition: transform ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
  }
`;

export const TierTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TierSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

export const TierList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TierListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.5;
`;

export const CheckIconSpan = styled.span<{ $featured?: boolean }>`
  color: ${({ $featured, theme }) =>
    $featured ? theme.colors.tertiary[500] : theme.colors.secondary[500]};
  display: inline-flex;
  margin-top: 2px;
`;

export const ProcessFlex = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ProcessCard = styled.div`
  flex: 1 1 250px;
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

export const ProcessStepTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.secondary[500]};
  margin: 0;
`;

export const ProcessStepDesc = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

export const CtaBox = styled.div`
  max-width: 780px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.secondary[400]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  box-shadow: ${({ theme }) => theme.effects.glow.success};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;
