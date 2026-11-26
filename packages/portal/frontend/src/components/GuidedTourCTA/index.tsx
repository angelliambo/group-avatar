import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import {
  SoundOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ForwardOutlined,
  BackwardOutlined,
  CloseOutlined,
  AudioMutedOutlined,
  CompassOutlined,
} from "@ant-design/icons";
import { useTranslation } from "../../i18n";
import TrackedClick from "../TrackedClick";
import { GuidedTourCTAProps, GuidedTourStep } from "./GuidedTourCTA.types";
import {
  FloatingTourContainer,
  FloatingTourButton,
  TourIconWrapper,
  TourBadgeLabel,
  AudioWavesContainer,
  AudioWaveBar,
  FloatingSpeechCard,
  CardHeader,
  CardTitleGroup,
  CardTitle,
  StepCounterBadge,
  CloseIconButton,
  CardBody,
  SpeechTextContainer,
  ControlsRow,
  PlayControlsGroup,
  ControlButton,
} from "./GuidedTourCTA.styles";

const HOME_TOUR_STEPS: GuidedTourStep[] = [
  { id: "home-1", targetId: "hero", speechKey: "guidedTourStep1Text" },
  { id: "home-2", targetId: "unidades", speechKey: "guidedTourStep2Text" },
  { id: "home-3", targetId: "features", speechKey: "guidedTourStep3Text" },
  { id: "home-4", targetId: "stats", speechKey: "guidedTourStep4Text" },
  { id: "home-5", targetId: "location", speechKey: "guidedTourStep5Text" },
];

const LOGISTICA_TOUR_STEPS: GuidedTourStep[] = [
  { id: "log-1", targetId: "logistica-hero", speechKey: "guidedTourStep1Text" },
  { id: "log-2", targetId: "logistica-pilares", speechKey: "guidedTourStep2Text" },
  { id: "log-3", targetId: "logistica-flujo", speechKey: "guidedTourStep3Text" },
  { id: "log-4", targetId: "logistica-cta", speechKey: "guidedTourStep4Text" },
];

const MUDANZAS_TOUR_STEPS: GuidedTourStep[] = [
  { id: "mud-1", targetId: "mudanzas-hero", speechKey: "guidedTourStep1Text" },
  { id: "mud-2", targetId: "mudanzas-modalidades", speechKey: "guidedTourStep2Text" },
  { id: "mud-3", targetId: "mudanzas-proceso", speechKey: "guidedTourStep3Text" },
  { id: "mud-4", targetId: "mudanzas-cta", speechKey: "guidedTourStep4Text" },
];

const SPEECH_RATE = 1.3;

const GuidedTourCTA: React.FC<GuidedTourCTAProps> = memo(
  ({ pageNamespace = "home", steps }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(false);

    const activeSteps = useMemo(() => {
      if (steps && steps.length > 0) return steps;
      if (pageNamespace === "logistica") return LOGISTICA_TOUR_STEPS;
      if (pageNamespace === "mudanzas") return MUDANZAS_TOUR_STEPS;
      return HOME_TOUR_STEPS;
    }, [pageNamespace, steps]);

    const isPlayingRef = useRef(false);
    isPlayingRef.current = isPlaying;

    const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
      undefined
    );

    const scrollToTarget = useCallback((targetId: string) => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("tour:step-changed", { detail: { targetId } })
        );
      }
      const element = document.getElementById(targetId);
      if (element) {
        const isMobile =
          typeof window !== "undefined" && window.innerWidth <= 768;
        const headerOffset = isMobile ? 64 : 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });
      }
    }, []);

    const stopAudio = useCallback(() => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = undefined;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }, []);

    const finishTour = useCallback(() => {
      setIsPlaying(false);
      isPlayingRef.current = false;
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, []);

    const getStepText = useCallback(
      (speechKey: string) => {
        return t(`pages.${pageNamespace}.${speechKey}`);
      },
      [pageNamespace, t]
    );

    const playStepAudio = useCallback(
      (index: number) => {
        stopAudio();

        const step = activeSteps[index] || activeSteps[0];
        if (!step) return;

        scrollToTarget(step.targetId);

        const textToSpeak = getStepText(step.speechKey);

        if (
          !isMuted &&
          typeof window !== "undefined" &&
          "speechSynthesis" in window
        ) {
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.lang = "es-AR";
          utterance.rate = SPEECH_RATE;
          utterance.pitch = 1.0;

          utterance.onend = () => {
            if (!isPlayingRef.current) return;
            if (index < activeSteps.length - 1) {
              fallbackTimerRef.current = setTimeout(() => {
                if (isPlayingRef.current) {
                  const next = index + 1;
                  setCurrentStepIndex(next);
                  playStepAudio(next);
                }
              }, 600);
            } else {
              finishTour();
            }
          };

          utterance.onerror = () => {
            if (!isPlayingRef.current) return;
            if (index < activeSteps.length - 1) {
              fallbackTimerRef.current = setTimeout(() => {
                if (isPlayingRef.current) {
                  const next = index + 1;
                  setCurrentStepIndex(next);
                  playStepAudio(next);
                }
              }, 5000);
            } else {
              finishTour();
            }
          };

          window.speechSynthesis.speak(utterance);
        } else {
          if (index < activeSteps.length - 1) {
            fallbackTimerRef.current = setTimeout(() => {
              if (isPlayingRef.current) {
                const next = index + 1;
                setCurrentStepIndex(next);
                playStepAudio(next);
              }
            }, 4500);
          } else {
            finishTour();
          }
        }
      },
      [activeSteps, finishTour, getStepText, isMuted, scrollToTarget, stopAudio]
    );

    const handleStartTour = useCallback(() => {
      stopAudio();
      setIsOpen(true);
      setIsPlaying(true);
      isPlayingRef.current = true;
      setCurrentStepIndex(0);
      playStepAudio(0);
    }, [playStepAudio, stopAudio]);

    const handleTogglePlay = useCallback(() => {
      if (isPlaying) {
        stopAudio();
        setIsPlaying(false);
        isPlayingRef.current = false;
      } else {
        setIsPlaying(true);
        isPlayingRef.current = true;
        playStepAudio(currentStepIndex);
      }
    }, [currentStepIndex, isPlaying, playStepAudio, stopAudio]);

    const handleNextStep = useCallback(() => {
      stopAudio();
      if (currentStepIndex < activeSteps.length - 1) {
        const nextIndex = currentStepIndex + 1;
        setCurrentStepIndex(nextIndex);
        if (isPlaying) {
          playStepAudio(nextIndex);
        } else {
          const step = activeSteps[nextIndex];
          if (step) scrollToTarget(step.targetId);
        }
      }
    }, [activeSteps, currentStepIndex, isPlaying, playStepAudio, scrollToTarget, stopAudio]);

    const handlePrevStep = useCallback(() => {
      stopAudio();
      if (currentStepIndex > 0) {
        const prevIndex = currentStepIndex - 1;
        setCurrentStepIndex(prevIndex);
        if (isPlaying) {
          playStepAudio(prevIndex);
        } else {
          const step = activeSteps[prevIndex];
          if (step) scrollToTarget(step.targetId);
        }
      }
    }, [activeSteps, currentStepIndex, isPlaying, playStepAudio, scrollToTarget, stopAudio]);

    const handleToggleMute = useCallback(() => {
      stopAudio();
      setIsMuted((prev) => {
        const nextMute = !prev;
        if (isPlaying) {
          setTimeout(() => playStepAudio(currentStepIndex), 50);
        }
        return nextMute;
      });
    }, [currentStepIndex, isPlaying, playStepAudio, stopAudio]);

    const handleCloseTour = useCallback(() => {
      stopAudio();
      setIsPlaying(false);
      isPlayingRef.current = false;
      setIsOpen(false);
    }, [stopAudio]);

    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          stopAudio();
          setIsPlaying(false);
          isPlayingRef.current = false;
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        stopAudio();
      };
    }, [stopAudio]);

    const safeStepIndex = Math.min(
      Math.max(0, currentStepIndex),
      activeSteps.length - 1
    );
    const currentStep = activeSteps[safeStepIndex] || activeSteps[0];
    const badgeLabel =
      pageNamespace === "home"
        ? t("pages.home.guidedTourBadge")
        : t(`pages.${pageNamespace}.guidedTourBadge`);

    return (
      <>
        <FloatingTourContainer>
          <TrackedClick
            label={`Guided Tour Button - ${pageNamespace}`}
            action="click_guided_tour_button"
            category="marketing"
          >
            <FloatingTourButton
              onClick={isOpen ? handleCloseTour : handleStartTour}
              $isActive={isOpen}
              type="button"
              aria-label={badgeLabel}
            >
              <TourIconWrapper $isActive={isOpen}>
                {isPlaying && !isMuted ? (
                  <AudioWavesContainer>
                    <AudioWaveBar $delay={0} />
                    <AudioWaveBar $delay={0.2} />
                    <AudioWaveBar $delay={0.4} />
                  </AudioWavesContainer>
                ) : (
                  <ZnIcon icon={CompassOutlined} />
                )}
              </TourIconWrapper>
              <TourBadgeLabel>{badgeLabel}</TourBadgeLabel>
            </FloatingTourButton>
          </TrackedClick>
        </FloatingTourContainer>

        <FloatingSpeechCard $isOpen={isOpen}>
          <CardHeader>
            <CardTitleGroup>
              <ZnIcon icon={SoundOutlined} />
              <CardTitle>{badgeLabel}</CardTitle>
            </CardTitleGroup>
            <StepCounterBadge>
              {t("pages.home.guidedTourStepCount", {
                current: String(safeStepIndex + 1),
                total: String(activeSteps.length),
              })}
            </StepCounterBadge>
            <CloseIconButton
              onClick={handleCloseTour}
              aria-label={t("pages.home.guidedTourClose")}
              type="button"
            >
              <ZnIcon icon={CloseOutlined} />
            </CloseIconButton>
          </CardHeader>

          <CardBody>
            <SpeechTextContainer>
              {currentStep ? getStepText(currentStep.speechKey) : ""}
            </SpeechTextContainer>
          </CardBody>

          <ControlsRow>
            <PlayControlsGroup>
              <ControlButton
                onClick={handlePrevStep}
                disabled={safeStepIndex === 0}
                type="button"
                aria-label={t("pages.home.guidedTourPrev")}
              >
                <ZnIcon icon={BackwardOutlined} />
              </ControlButton>

              <ControlButton
                onClick={handleTogglePlay}
                $primary={true}
                type="button"
              >
                <ZnIcon
                  icon={isPlaying ? PauseCircleOutlined : PlayCircleOutlined}
                />
                {isPlaying
                  ? t("pages.home.guidedTourPause")
                  : t("pages.home.guidedTourPlay")}
              </ControlButton>

              <ControlButton
                onClick={handleNextStep}
                disabled={safeStepIndex === activeSteps.length - 1}
                type="button"
                aria-label={t("pages.home.guidedTourNext")}
              >
                <ZnIcon icon={ForwardOutlined} />
              </ControlButton>
            </PlayControlsGroup>

            <ControlButton
              onClick={handleToggleMute}
              type="button"
              aria-label={
                isMuted
                  ? t("pages.home.guidedTourUnmute")
                  : t("pages.home.guidedTourMute")
              }
            >
              <ZnIcon icon={isMuted ? SoundOutlined : AudioMutedOutlined} />
            </ControlButton>
          </ControlsRow>
        </FloatingSpeechCard>
      </>
    );
  }
);

GuidedTourCTA.displayName = "GuidedTourCTA";

export default GuidedTourCTA;
