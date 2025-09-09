import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import InteractiveMap from "../InteractiveMap";

export function SalaryGlobalMap({
	selectedRegion,
	setSelectedRegion,
	regionData,
}: {
	selectedRegion: string;
	setSelectedRegion: (region: string) => void;
	regionData: { region: string; multiplier: number; color: string }[];
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<MapPin className="w-5 h-5" />
					Mapa Global de Salários
				</CardTitle>
			</CardHeader>
			<CardContent>
				<InteractiveMap
					selectedRegion={selectedRegion}
					onRegionSelect={setSelectedRegion}
					regionData={regionData}
				/>
			</CardContent>
		</Card>
	);
}
