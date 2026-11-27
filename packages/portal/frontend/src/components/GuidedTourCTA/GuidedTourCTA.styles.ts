import styled, { keyframes, css } from "styled-components";

const tourHeartbeatAndColor = keyframes`
  0%, 100% {
    transform: scale(1);
    background-color: var(--tour-bg-dark);
    border-color: var(--tour-border-dark);
    box-shadow: 0 0 12px var(--tour-glow-dark), 0 4px 14px var(--tour-shadow-base);
  }
  50% {
    transform: scale(1.06);
    background-color: var(--tour-bg-vivid);
    border-color: var(--tour-border-vivid);
    box-shadow: 0 0 26px var(--tour-glow-vivid), 0 0 42px var(--tour-glow-outer), 0 6px 18px var(--tour-shadow-base);
  }
`;

const tourAuraWave = keyframes`
  0% {
    opacity: 0.75;
    transform: scale(0.96, 0.96);
  }
  70% {
    opacity: 0;
    transform: scale(1.26, 1.55);
  }
  100% {
    opacity: 0;
    transform: scale(1.26, 1.55);
  }
`;

const waveAnimation = keyframes`
  0%, 100% {
    transform: scaleY(0.4);
  }
  50% {
    transform: scaleY(1);
  }
`;

export const FloatingTourContainer = styled.div<{ $isActive?: boolean }>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  top: 72px;
  right: ${({ theme }) => theme.spacing.md};
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    border: 2px solid ${({ theme }) => theme.colors.tertiary[500]};
    background: ${({ theme }) => `${theme.colors.tertiary[500]}33`};
    filter: blur(${({ theme }) => theme.effects.blur.subtle});
    z-index: 0;
    pointer-events: none;
    display: ${({ $isActive }) => ($isActive ? "none" : "block")};
    animation: ${tourAuraWave} 2.6s ease-in-out infinite;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    top: 76px;
    right: ${({ theme }) => theme.spacing.lg};
  }
`;

export const FloatingTourButton = styled.button<{ $isActive?: boolean }>`
  --tour-bg-dark:'none';
  --tour-bg-vivid:'black';
  --tour-border-dark: ${({ theme }) => theme.colors.primary[300]};
  --tour-border-vivid: ${({ theme }) => theme.colors.tertiary[600]};
  --tour-glow-dark: ${({ theme }) => `${theme.colors.primary[500]}55`};
  --tour-glow-vivid: ${({ theme }) => `${theme.colors.tertiary[500]}cc`};
  --tour-glow-outer: ${({ theme }) => `${theme.colors.tertiary[500]}66`};
  --tour-shadow-base: ${({ theme }) => theme.colors.neutral[50]};

  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary[500] : theme.colors.primary[100]};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: 1px solid
    ${({ $isActive, theme }) =>
      $isActive ? theme.colors.tertiary[600] : theme.colors.primary[300]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.effects.glow.primary};
  transition: transform ${({ theme }) => theme.transitions.normal},
    background-color ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};
  animation: ${({ $isActive }) =>
    $isActive
      ? "none"
      : css`
          ${tourHeartbeatAndColor} 2.6s ease-in-out infinite
        `};

  &:hover {
    transform: translateY(-2px) scale(1.05);
    background-color: ${({ theme }) => theme.colors.tertiary[500]};
    border-color: ${({ theme }) => theme.colors.tertiary[600]};
    box-shadow: ${({ theme }) => theme.effects.glow.premium};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TourIconWrapper = styled.div<{ $isActive?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.inverse};
`;

export const TourBadgeLabel = styled.span`
  letter-spacing: 0.3px;
  white-space: nowrap;
`;

export const AudioWavesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  height: 14px;
`;

export const AudioWaveBar = styled.div<{ $delay: number }>`
  width: 3px;
  height: 100%;
  background-color: currentColor;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  animation: ${waveAnimation} 0.6s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

export const FloatingSpeechCard = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modal};
  top: 126px;
  right: ${({ theme }) => theme.spacing.lg};
  width: 380px;
  max-width: calc(100vw - ${({ theme }) => theme.spacing.xl});
  background: ${({ theme }) => theme.colors.background.card};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary[400]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.effects.glow.primary},
    ${({ theme }) => theme.shadows.heavy};
  backdrop-filter: blur(16px);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.95)"};
  transition: opacity ${({ theme }) => theme.transitions.normal},
    transform ${({ theme }) => theme.transitions.normal},
    visibility ${({ theme }) => theme.transitions.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    right: ${({ theme }) => theme.spacing.md};
    top: 122px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const CardTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  white-space: nowrap;
  flex-shrink: 1;
  min-width: 0;
  color: ${({ theme }) => theme.colors.primary[600]};
`;

export const CardTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary[600]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StepCounterBadge = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const CloseIconButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: 50%;
  flex-shrink: 0;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

export const CardBody = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SpeechTextContainer = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.primary};
  min-height: 64px;
  max-height: 140px;
  overflow-y: auto;
`;

export const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const PlayControlsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const ControlButton = styled.button<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.primary[500] : theme.colors.background.secondary};
  color: ${({ $primary, theme }) =>
    $primary ? theme.colors.text.inverse : theme.colors.text.primary};
  border: 1px solid
    ${({ $primary, theme }) =>
      $primary ? theme.colors.primary[400] : theme.colors.border.light};

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;
