import { useEffect, useMemo, useState } from "react";
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

type GroupKey = "United States" | "Europe" | "Asia";

type PropertiesRecord = Record<string, unknown>;

const getNameFromFeature = (f: GeoJSONFeature): string => {
	const props = (f.properties || {}) as PropertiesRecord;
	return (
		(String(props.NAME) || "") ||
		(String(props.name) || "") ||
		(String(props.ADMIN) || "")
	);
};

const getCustomProp = <T,>(f: GeoJSONFeature, key: string): T | undefined => {
	const props = (f.properties || {}) as PropertiesRecord;
	return props[key] as T | undefined;
};

const isGeoJSONFeature = (data: unknown): data is GeoJSONFeature => {
	return (
		typeof data === 'object' &&
		data !== null &&
		'type' in data &&
		(data as { type: unknown }).type === 'Feature' &&
		'geometry' in data &&
		'properties' in data
	);
};

export function InteractiveMap({
	selectedCountry,
	onCountrySelect,
}: InteractiveMapProps) {
	const [interactiveData, setInteractiveData] = useState<GeoJSONData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadGeoData = async () => {
			try {
				const regions = [
					{ key: 'United States' as GroupKey, file: 'USA.geojson', label: 'Estados Unidos' },
					{ key: 'Europe' as GroupKey, file: 'EU-simplified.geojson', label: 'Europa' },
					{ key: 'Asia' as GroupKey, file: 'AS-simplified.geojson', label: 'Ásia' }
				];

				const loadPromises = regions.map(async (region) => {
					const assetUrl = new URL(`../data/continents/${region.file}`, import.meta.url).href;
					const response = await fetch(assetUrl);
					const data = await response.json();
					return {
						...region,
						data: data as GeoJSONData,
					};
				});

				const loadedRegions = await Promise.all(loadPromises);

				const allFeatures: GeoJSONFeature[] = [];
				loadedRegions.forEach(region => {
					let features: GeoJSONFeature[] = [];
					if (region.data?.features) {
						features = region.data.features;
					} else if (Array.isArray(region.data)) {
						features = region.data as GeoJSONFeature[];
					} else if (isGeoJSONFeature(region.data)) {
						features = [region.data];
					} else {
						console.error(`Data structure not recognized for region: ${region.key}`, region.data);
						return;
					}

					const mappedFeatures = features.map((f) => ({
						...f,
						properties: {
							...(f.properties || {}),
							__group: region.key,
							__label: region.label,
						} as PropertiesRecord,
					}));
					allFeatures.push(...mappedFeatures);
				});

				setInteractiveData({ type: "FeatureCollection", features: allFeatures as unknown as GeoJSONFeature[] });
			} catch (error) {
				console.error("Error loading map data:", error);
			} finally {
				setLoading(false);
			}
		};

		loadGeoData();
	}, []);

	const selectedGroup = useMemo(() => selectedCountry as GroupKey | undefined, [selectedCountry]);

	const handleFeatureClick = (feature: GeoJSONFeature) => {
		const group = getCustomProp<GroupKey>(feature, "__group");
		if (!group) return;
		if (onCountrySelect) {
			onCountrySelect(group);
		}
	};

	const onEachInteractiveFeature = (feature: GeoJSONFeature, layer: Layer) => {
		const group = getCustomProp<GroupKey>(feature, "__group");
		const labelByGroup: Record<GroupKey, string> = {
			"United States": "Estados Unidos",
			Europe: "Europa",
			Asia: "Ásia",
		};
		
		const label = group ? labelByGroup[group] : getNameFromFeature(feature);
		
		const tooltipOptions = {
			className: "country-tooltip",
			sticky: true,
			direction: 'center' as const,
			offset: [0, -10] as [number, number]
		};
			
		layer.bindTooltip(String(label), tooltipOptions);

		layer.on({
			click: () => handleFeatureClick(feature),
			mouseover: (e) => {
				const target = e.target as Layer & { setStyle: (style: PathOptions) => void };
				const isSelected = Boolean(selectedGroup && getCustomProp<GroupKey>(feature, "__group") === selectedGroup);
				target.setStyle({
					weight: 2,
					color: isSelected ? "#16a34a" : "#374151",
					fillOpacity: 0.85,
					fillColor: isSelected ? "#22c55e" : "#a7f3d0",
				});
			},
			mouseout: (e) => {
				const target = e.target as Layer & { setStyle: (style: PathOptions) => void };
				target.setStyle(getInteractiveStyle(feature));
			},
		});
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
		const isSelected = Boolean(selectedGroup && getCustomProp<GroupKey>(feature, "__group") === selectedGroup);
		return {
			weight: isSelected ? 3 : 1,
			opacity: 1,
			color: isSelected ? "#15803d" : "#166534",
			fillOpacity: isSelected ? 0.9 : 0.7,
			fillColor: isSelected ? "#22c55e" : "#86efac",
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

				{interactiveData && (
					<GeoJSON
						key={`interactive-${selectedGroup || "none"}`}
						data={interactiveData}
						style={getInteractiveStyle}
						onEachFeature={onEachInteractiveFeature}
					/>
				)}
			</MapContainer>
		</div>
	);
}
