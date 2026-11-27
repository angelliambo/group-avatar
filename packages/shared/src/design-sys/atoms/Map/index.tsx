import React, { useEffect, useRef } from "react";
import { EnvironmentFilled } from "@ant-design/icons";
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
  $address = "Araujo 1508, Mataderos, CABA, Argentina",
  $latitude = -34.6512,
  $longitude = -58.5024,
  $zoom = 15,
  $provider = "static-image",
  $markerIconUrl,
  $mapImageUrl = "/assets/images/map.webp",
  $mapMobileImageUrl = "/assets/images/map-mobile.webp",
  $mapLinkUrl = "https://www.google.com/maps/search/?api=1&query=Araujo+1508,+Mataderos,+Buenos+Aires,+Argentina",
  $showOverlayPin = true,
  className,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapInstance = useRef<{ remove: () => void } | null>(null);
  const { isMobile } = useResponsive();

  const finalImageUrl = isMobile && $mapMobileImageUrl ? $mapMobileImageUrl : $mapImageUrl;

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

        const map = L.map(mapRef.current).setView([$latitude, $longitude], $zoom);
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

        const marker = L.marker([$latitude, $longitude], { icon: customIcon }).addTo(map);

        if ($address) {
          marker.bindPopup(`<b>${$address}</b>`).openPopup();
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
  }, [$provider, $latitude, $longitude, $zoom, $markerIconUrl, $address]);

  if ($provider === "static-image") {
    return (
      <MapWrapper className={className}>
        <StaticMapLink href={$mapLinkUrl} target="_blank" rel="noopener noreferrer">
          <StaticMapImage src={finalImageUrl} alt={$address} loading="lazy" />
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
    $address
  )}&t=&z=${$zoom}&ie=UTF8&iwloc=&output=embed`;

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
