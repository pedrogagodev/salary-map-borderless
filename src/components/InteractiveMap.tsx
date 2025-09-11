import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { GeoJSONData, GeoJSONFeature } from "@/types/mapTypes";
import type { Layer, PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";

interface InteractiveMapProps {
	selectedCountry?: string;
	onCountrySelect?: (country: string) => void;
	countryData?: { country: string; multiplier: number; color: string }[];
}

export function InteractiveMap({
	selectedCountry,
	onCountrySelect,
}: InteractiveMapProps) {
	const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadGeoData = async () => {
			try {
				const response = await import("../data/GeoJSON-MAP.geojson?url");
				const geoJsonResponse = await fetch(response.default);
				const data: GeoJSONData = await geoJsonResponse.json();
				setGeoData(data);
			} catch (error) {
				console.error("Error loading map data:", error);
			} finally {
				setLoading(false);
			}
		};

		loadGeoData();
	}, []);

	const handleCountryClick = (feature: GeoJSONFeature) => {
		const countryName = feature.properties?.NAME || feature.properties?.name;

		if (!countryName) return;

		if (onCountrySelect) {
			onCountrySelect(countryName);
		}
	};

	const onEachFeature = (feature: GeoJSONFeature, layer: Layer) => {
		const countryName = feature.properties?.NAME || feature.properties?.name;
		if (countryName) {
			layer.bindTooltip(countryName, {
				className: "country-tooltip",
			});
		}

		layer.on({
			click: () => handleCountryClick(feature),
			mouseover: (e) => {
				const target = e.target as Layer & {
					setStyle: (style: PathOptions) => void;
				};
				const countryName =
					feature.properties?.NAME || feature.properties?.name;
				const isSelected = selectedCountry === countryName;

				target.setStyle({
					weight: 2,
					color: isSelected ? "#7c3aed" : "#374151",
					fillOpacity: 0.8,
					fillColor: isSelected ? "#8b5cf6" : "#94a3b8",
				});
			},
			mouseout: (e) => {
				const target = e.target as Layer & {
					setStyle: (style: PathOptions) => void;
				};
				target.setStyle(getCountryStyle(feature));
			},
		});
	};

	const getCountryStyle = (feature?: GeoJSONFeature): PathOptions => {
		if (!feature) {
			return {
				weight: 1,
				opacity: 1,
				color: "#666",
				fillOpacity: 0.6,
				fillColor: "#e2e8f0",
			};
		}

		const countryName = feature.properties?.NAME || feature.properties?.name;
		const isSelected = selectedCountry === countryName;

		return {
			weight: isSelected ? 3 : 1,
			opacity: 1,
			color: isSelected ? "#7c3aed" : "#475569",
			fillOpacity: isSelected ? 0.9 : 0.6,
			fillColor: isSelected ? "#8b5cf6" : "#e2e8f0",
		};
	};

	if (loading) {
		return (
			<div className="map-wrapper">
				<div className="flex items-center justify-center h-full">
					<p>Carregando mapa...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="map-wrapper-simple">
			<MapContainer center={[20, 0]} zoom={2} className="leaflet-map-simple">
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="© OpenStreetMap contributors"
				/>

				{geoData && (
					<GeoJSON
						key={`geojson-${selectedCountry || "none"}`}
						data={geoData}
						style={getCountryStyle}
						onEachFeature={onEachFeature}
					/>
				)}
			</MapContainer>
		</div>
	);
}
