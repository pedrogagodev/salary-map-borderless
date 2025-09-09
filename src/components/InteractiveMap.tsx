import { Globe } from "lucide-react";
import { Button } from "./ui/button";

export default function InteractiveMap({
	selectedRegion,
	onRegionSelect,
	regionData,
}: {
	selectedRegion: string;
	onRegionSelect: (region: string) => void;
	regionData: Array<{ region: string; multiplier: number; color: string }>;
}) {
	return (
		<div className="relative bg-card/50 rounded-lg p-6 min-h-[300px] border border-border">
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="text-center space-y-4">
					<Globe className="w-16 h-16 text-muted-foreground mx-auto" />
					<div>
						<p className="text-lg font-medium text-foreground">
							Mapa Interativo
						</p>
						<p className="text-sm text-muted-foreground">
							Componente será implementado aqui
						</p>
					</div>
				</div>
			</div>

			{/* Temporary region selector for now */}
			<div className="absolute bottom-4 left-4 right-4">
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
					{regionData.map((region) => (
						<Button
							key={region.region}
							onClick={() => onRegionSelect(region.region)}
							className={`p-2 rounded-md text-xs font-medium transition-colors ${
								selectedRegion === region.region
									? "bg-primary text-white"
									: "bg-card hover:bg-accent text-foreground hover:text-accent-foreground border border-border"
							}`}
						>
							{region.region}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}
