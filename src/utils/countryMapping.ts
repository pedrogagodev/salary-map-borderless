export const COUNTRIES = {
  "Canada": { geoJson: "Canada", i18nKey: "canada" },
  "Dubai": { geoJson: "United Arab Emirates", i18nKey: "dubai" },
  "London": { geoJson: "United Kingdom", i18nKey: "london" },
  "Germany": { geoJson: "Germany", i18nKey: "germany" },
  "USA": { geoJson: "United States of America", i18nKey: "usa" },
  "Singapore": { geoJson: "Singapore", i18nKey: "singapore" },
  "China": { geoJson: "China", i18nKey: "china" },
  "Australia": { geoJson: "Australia", i18nKey: "australia" },
  "Sweden": { geoJson: "Sweden", i18nKey: "sweden" },
  "Netherlands": { geoJson: "Netherlands", i18nKey: "netherlands" },
  "Switzerland": { geoJson: "Switzerland", i18nKey: "switzerland" }
} as const;

export function hasCountrySalaryData(geoJsonName: string): boolean {
  return Object.values(COUNTRIES).some(country => country.geoJson === geoJsonName);
}

export function geoJSONCountryToSalary(geoJsonName: string): string | null {
  const entry = Object.entries(COUNTRIES).find(([_, country]) => country.geoJson === geoJsonName);
  return entry ? entry[0] : null;
}

export function getCountryTranslationKey(salaryCountryName: string): string | null {
  return COUNTRIES[salaryCountryName as keyof typeof COUNTRIES]?.i18nKey || null;
}
