import styled, { keyframes } from "styled-components";

const pinBounce = keyframes`
  0%, 100% {
    transform: translate(-50%, -100%);
  }
  50% {
    transform: translate(-50%, -112%);
  }
`;

export const MapWrapper = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.light};
  background-color: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
`;

export const StyledIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
  display: block;
`;

export const LeafletContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
`;

export const CustomPinImage = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.text.inverse};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: block;
`;

export const DefaultPin = styled.div`
  background-color: ${({ theme }) => theme.colors.primary[600]};
  color: ${({ theme }) => theme.colors.text.inverse};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

export const MapErrorFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const StaticMapLink = styled.a`
  display: block;
  width: 100%;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &::after {
    content: "Ver en Google Maps";
    position: absolute;
    bottom: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    background-color: ${({ theme }) => theme.colors.background.card};
    color: ${({ theme }) => theme.colors.text.primary};
    border: 1px solid ${({ theme }) => theme.colors.border.normal};
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    font-family: inherit;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    box-shadow: ${({ theme }) => theme.shadows.medium};
    opacity: 0.92;
    transition: opacity ${({ theme }) => theme.transitions.normal},
      transform ${({ theme }) => theme.transitions.normal};
    pointer-events: none;
    z-index: 2;
  }

  &:hover::after {
    opacity: 1;
    transform: translateY(-2px);
  }
`;

export const StaticMapImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.slow};

  ${StaticMapLink}:hover & {
    transform: scale(1.02);
  }
`;

export const StaticMapPin = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  z-index: 2;
  font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
  color: ${({ theme }) => theme.colors.primary[500]};
  pointer-events: none;
  animation: ${pinBounce} 2.4s ease-in-out infinite;
`;
