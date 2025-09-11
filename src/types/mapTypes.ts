import type { Feature, FeatureCollection, Geometry } from "geojson";

export interface CountryProperties {
	NAME?: string;
	name?: string;
	ADMIN?: string;
	ISO_A2?: string;
	ISO_A3?: string;
	CONTINENT?: string;
	[key: string]: unknown;
}

export interface SelectedCountry {
	name: string;
	continent: string;
	code: string;
}

export type GeoJSONFeature = Feature<Geometry, CountryProperties>;
export type GeoJSONData = FeatureCollection<Geometry, CountryProperties>;
