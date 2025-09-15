import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AnimatedContainer } from "../ui/animated-container";
import { InteractiveMap } from "../InteractiveMap";
import { useI18n } from "../../contexts/I18n";

export function SalaryGlobalMap({
	selectedCountry,
	setSelectedCountry,
	countryData,
}: {
	selectedCountry: string;
	setSelectedCountry: (country: string) => void;
	countryData: { country: string; multiplier: number; color: string }[];
}) {
	const { t } = useI18n();
	return (
		<AnimatedContainer delay={0.05}>
			<Card>
				<CardHeader>
					<AnimatedContainer delay={0.05}>
						<CardTitle className="flex items-center gap-2">
							<MapPin className="w-5 h-5" />
							{t.globalSalaryMap}
						</CardTitle>
					</AnimatedContainer>
				</CardHeader>
				<CardContent>
					<AnimatedContainer delay={0.05}>
						<InteractiveMap
							selectedCountry={selectedCountry}
							onCountrySelect={setSelectedCountry}
							countryData={countryData}
						/>
					</AnimatedContainer>
				</CardContent>
			</Card>
		</AnimatedContainer>
	);
}
