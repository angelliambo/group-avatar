import React, { useEffect, useRef } from "react";
import { EnvironmentFilled } from "@ant-design/icons";
import { BRAND_CONFIG } from "../../../config/brand";
import { ZnIcon } from "../ZnIcon";
import { MapProps } from "./Map.types";
import { useResponsive } from "../../hooks/useResponsive";
import {
  MapWrapper,
  StyledIframe,
  LeafletContainer,
  StaticMapLink,
  StaticMapImage,
  StaticMapPin,
} from "./Map.styles";

export const Map: React.FC<MapProps> = ({
  $address,
  $latitude,
  $longitude,
  $zoom,
  $provider = "static-image",
  $markerIconUrl,
  $mapImageUrl,
  $mapMobileImageUrl,
  $mapLinkUrl,
  $showOverlayPin = true,
  className,
}) => {
  const resolvedAddress = $address ?? BRAND_CONFIG.address;
  const resolvedLatitude = $latitude ?? BRAND_CONFIG.latitude;
  const resolvedLongitude = $longitude ?? BRAND_CONFIG.longitude;
  const resolvedZoom = $zoom ?? BRAND_CONFIG.mapZoom;
  const resolvedMapImageUrl = $mapImageUrl ?? BRAND_CONFIG.mapImageUrl;
  const resolvedMapMobileImageUrl = $mapMobileImageUrl ?? BRAND_CONFIG.mapMobileImageUrl;
  const resolvedMapLinkUrl = $mapLinkUrl ?? BRAND_CONFIG.mapLinkUrl;

  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapInstance = useRef<{ remove: () => void } | null>(null);
  const { isMobile } = useResponsive();

  const finalImageUrl =
    isMobile && resolvedMapMobileImageUrl ? resolvedMapMobileImageUrl : resolvedMapImageUrl;

  useEffect(() => {
    if ($provider !== "leaflet" || !mapRef.current) return;

    let isMounted = true;

    const initLeaflet = async () => {
      try {
        const L = await import("leaflet");

        try {
          require("leaflet/dist/leaflet.css");
        } catch {
          console.warn(
            "Leaflet CSS could not be loaded via require, ensure it is imported in the application."
          );
        }

        if (!isMounted || !mapRef.current) return;

        if (leafletMapInstance.current) {
          leafletMapInstance.current.remove();
        }

        const map = L.map(mapRef.current).setView(
          [resolvedLatitude, resolvedLongitude],
          resolvedZoom
        );
        leafletMapInstance.current = map;

        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }).addTo(map);

        const iconUrl =
          $markerIconUrl || "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
        const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

        const customIcon = L.icon({
          iconUrl,
          shadowUrl,
          iconSize: $markerIconUrl ? [40, 40] : [25, 41],
          iconAnchor: $markerIconUrl ? [20, 40] : [12, 41],
          popupAnchor: $markerIconUrl ? [0, -40] : [1, -34],
          shadowSize: [41, 41],
        });

        const marker = L.marker([resolvedLatitude, resolvedLongitude], {
          icon: customIcon,
        }).addTo(map);

        if (resolvedAddress) {
          marker.bindPopup(`<b>${resolvedAddress}</b>`).openPopup();
        }
      } catch (err) {
        console.error("Error al inicializar Leaflet Map:", err);
      }
    };

    initLeaflet();

    return () => {
      isMounted = false;
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
      }
    };
  }, [
    $provider,
    resolvedLatitude,
    resolvedLongitude,
    resolvedZoom,
    $markerIconUrl,
    resolvedAddress,
  ]);

  if ($provider === "static-image") {
    return (
      <MapWrapper className={className}>
        <StaticMapLink href={resolvedMapLinkUrl} target="_blank" rel="noopener noreferrer">
          <StaticMapImage src={finalImageUrl} alt={resolvedAddress} loading="lazy" />
          {$showOverlayPin && (
            <StaticMapPin>
              <ZnIcon icon={EnvironmentFilled} />
            </StaticMapPin>
          )}
        </StaticMapLink>
      </MapWrapper>
    );
  }

  if ($provider === "leaflet") {
    return (
      <MapWrapper className={className}>
        <LeafletContainer ref={mapRef} />
      </MapWrapper>
    );
  }

  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    resolvedAddress
  )}&t=&z=${resolvedZoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <MapWrapper className={className}>
      <StyledIframe
        title="Ubicación"
        src={embedUrl}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </MapWrapper>
  );
};

export type { MapProps };
export default Map;
