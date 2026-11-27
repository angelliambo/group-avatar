import styled, { keyframes } from "styled-components";

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(60px) scale(0.3);
  }
  50% {
    opacity: 1;
    transform: translateY(-10px) scale(1.08);
  }
  70% {
    transform: translateY(5px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const whatsappHeartbeatAndColor = keyframes`
  0%, 100% {
    transform: scale(1);
    background-color: var(--wa-bg-deep);
    border-color: var(--wa-border-base);
    box-shadow: 0 0 14px var(--wa-glow-soft), 0 4px 16px var(--wa-shadow-base);
  }
  50% {
    transform: scale(1.06);
    background-color: var(--wa-bg-vivid);
    border-color: var(--wa-border-vivid);
    box-shadow: 0 0 28px var(--wa-glow-vivid), 0 0 46px var(--wa-glow-outer), 0 6px 20px var(--wa-shadow-base);
  }
`;

const whatsappAuraWave = keyframes`
  0% {
    opacity: 0.82;
    transform: scale(0.96, 0.96);
  }
  70% {
    opacity: 0;
    transform: scale(1.28, 1.6);
  }
  100% {
    opacity: 0;
    transform: scale(1.28, 1.6);
  }
`;

export const FloatingCTAContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: ${(props) => props.theme.spacing.lg};
  left: ${(props) => props.theme.spacing.lg};
  z-index: ${(props) => props.theme.zIndex.tooltip};
  display: ${(props) => (props.$isVisible ? "flex" : "none")};
  align-items: center;
  isolation: isolate;
  animation: ${bounceIn} 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: ${(props) => props.theme.borderRadius.xl};
    border: 2px solid ${(props) => props.theme.colors.success[600]};
    background: ${(props) => `${props.theme.colors.success[500]}38`};
    filter: blur(${(props) => props.theme.effects.blur.subtle});
    z-index: 0;
    pointer-events: none;
    animation: ${whatsappAuraWave} 2.6s ease-in-out infinite;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    bottom: ${(props) => props.theme.spacing.md};
    left: ${(props) => props.theme.spacing.md};
  }
`;

export const WhatsAppButton = styled.a`
  --wa-bg-deep: ${(props) => props.theme.colors.success[700]};
  --wa-bg-vivid: ${(props) => props.theme.colors.success[500]};
  --wa-border-base: ${(props) => props.theme.colors.success[500]};
  --wa-border-vivid: ${(props) => props.theme.colors.success[600]};
  --wa-glow-soft: ${(props) => `${props.theme.colors.success[500]}66`};
  --wa-glow-vivid: ${(props) => `${props.theme.colors.success[500]}db`};
  --wa-glow-outer: ${(props) => `${props.theme.colors.success[600]}75`};
  --wa-shadow-base: ${(props) => props.theme.colors.neutral[50]};

  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  background-color: ${(props) => props.theme.colors.success[700]};
  color: ${(props) => props.theme.colors.text.inverse};
  border: 1px solid ${(props) => props.theme.colors.success[500]};
  padding: ${(props) => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  text-decoration: none;
  font-family: ${(props) => props.theme.typography.fontFamily.primary};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  animation: ${whatsappHeartbeatAndColor} 2.6s ease-in-out infinite;
  transition: transform ${(props) => props.theme.transitions.normal},
    background-color ${(props) => props.theme.transitions.normal},
    box-shadow ${(props) => props.theme.transitions.normal};
  user-select: none;

  &:hover {
    transform: translateY(-3px) scale(1.06);
    background-color: ${(props) => props.theme.colors.success[500]};
    border-color: ${(props) => props.theme.colors.success[600]};
    color: ${(props) => props.theme.colors.text.inverse};
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  line-height: 1;
`;

export const BadgeText = styled.span`
  white-space: nowrap;
  letter-spacing: 0.2px;
`;
