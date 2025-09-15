import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { GeoJSONData, GeoJSONFeature } from "@/types/mapTypes";
import type { Layer, PathOptions, Path, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import { useI18n } from "../contexts/I18n";
import { 
  geoJSONCountryToSalary,
  getCountryTranslationKey
} from "../utils/countryMapping";

interface InteractiveMapProps {
	selectedCountry?: string;
	onCountrySelect?: (country: string) => void;
	countryData?: { country: string; multiplier: number; color: string }[];
}

type PropertiesRecord = Record<string, unknown>;

const getNameFromFeature = (f: GeoJSONFeature): string => {
	const props = (f.properties || {}) as PropertiesRecord;
	return (
		(String(props.NAME) || "") ||
		(String(props.name) || "") ||
		(String(props.ADMIN) || "")
	);
};


export function InteractiveMap({
	selectedCountry,
	onCountrySelect,
}: InteractiveMapProps) {
	const { t, language } = useI18n();
	const [interactiveData, setInteractiveData] = useState<GeoJSONData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadGeoData = async () => {
			try {
				setLoading(true);
				
				const assetUrl = new URL('../data/GeoJSON-MAP.geojson', import.meta.url).href;
				const response = await fetch(assetUrl);
				const worldData = await response.json() as GeoJSONData;

				setInteractiveData(worldData);
			} catch (error) {
				console.error("Error loading world map data:", error);
			} finally {
				setLoading(false);
			}
		};

		loadGeoData();
	}, []);

	const selectedCountryName = useMemo(() => selectedCountry, [selectedCountry]);

	const handleFeatureClick = (feature: GeoJSONFeature) => {
		const geoJsonCountryName = getNameFromFeature(feature);
		const salaryCountryName = geoJSONCountryToSalary(geoJsonCountryName);
		
		if (salaryCountryName && onCountrySelect) {
			onCountrySelect(salaryCountryName);
		}
	};

	const onEachInteractiveFeature = (feature: GeoJSONFeature, layer: Layer) => {
		const geoJsonCountryName = getNameFromFeature(feature);
		const salaryCountryName = geoJSONCountryToSalary(geoJsonCountryName);
		
		let label = salaryCountryName || geoJsonCountryName;
		
		if (salaryCountryName) {
			const translationKey = getCountryTranslationKey(salaryCountryName);
			if (translationKey && t[translationKey as keyof typeof t]) {
				label = t[translationKey as keyof typeof t] as string;
			}
		}

		const isAvailable = Boolean(salaryCountryName);

		if (isAvailable) {
			const tooltipOptions = {
				className: "country-tooltip",
				sticky: true,
				direction: 'center' as const,
				offset: [0, -10] as [number, number]
			};
			layer.bindTooltip(String(label), tooltipOptions);
		}

		const el = (layer as unknown as { getElement?: () => HTMLElement | null }).getElement?.();
		if (el) el.style.cursor = isAvailable ? "pointer" : "not-allowed";

		const handlers: Record<string, (e: LeafletMouseEvent) => void> = {};
		if (isAvailable) {
			handlers.click = () => handleFeatureClick(feature);
			handlers.mouseover = (e: LeafletMouseEvent) => {
				const target = e.target as Path;
				const isSelected = Boolean(selectedCountryName && salaryCountryName === selectedCountryName);
				target.setStyle({
					weight: isSelected ? 5 : 4,
					color: "#111827",
					fillOpacity: isSelected ? 0.95 : 0.45,
					fillColor: "#22c55e",
				});
			};
			handlers.mouseout = (e: LeafletMouseEvent) => {
				const target = e.target as Path;
				target.setStyle(getInteractiveStyle(feature));
			};
		}

		layer.on(handlers as Record<string, (e: LeafletMouseEvent) => void>);
	};

	const getInteractiveStyle = (feature?: GeoJSONFeature): PathOptions => {
		if (!feature) {
			return {
				weight: 1,
				opacity: 1,
				color: "#166534",
				fillOpacity: 0.7,
				fillColor: "#86efac",
			};
		}
		
		const geoJsonCountryName = getNameFromFeature(feature);
		const salaryCountryName = geoJSONCountryToSalary(geoJsonCountryName);
		const isAvailable = Boolean(salaryCountryName);
		const isSelected = Boolean(selectedCountryName && salaryCountryName === selectedCountryName);
		
		if (!isAvailable) {
			return {
				weight: 0.7,
				opacity: 1,
				color: "#9ca3af",
				fillOpacity: 0,
				fillColor: "transparent",
			};
		}

		return {
			weight: isSelected ? 2 : 1,
			opacity: 1,
			color: "#111827",
			fillOpacity: isSelected ? 0.95 : 0.2,
			fillColor: "#22c55e",
		};
	};

	if (loading) {
		return (
			<div className="map-wrapper">
				<div className="flex items-center justify-center h-full">
					<p>{t.loadingMap}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="map-wrapper-simple">
			<MapContainer 
				key={`map-${language}`}
				center={[20, 0]} 
				zoom={2} 
				className="leaflet-map-simple"
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="© OpenStreetMap contributors"
				/>

				{interactiveData && (
					<GeoJSON
						key={`interactive-${selectedCountryName || "none"}`}
						data={interactiveData}
						style={getInteractiveStyle}
						onEachFeature={onEachInteractiveFeature}
					/>
				)}
			</MapContainer>
		</div>
	);
}
