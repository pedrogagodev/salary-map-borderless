import { Code } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { salaryData } from "../utils/dataArea";
import { areaIcons } from "../utils/dataArea";
import { useState } from "react";

const stackData = [
	"Node.js",
	"Python",
	"Java",
	"Solidity",
	"Go",
	"React",
	"TypeScript",
	"Rust",
	"C++",
	"PHP",
];

interface FilterSidebarProps {
	selectedArea: string;
	setSelectedArea: (area: string) => void;
	experience: number[];
	setExperience: (experience: number[]) => void;
	hasInternational: boolean;
	setHasInternational: (hasInternational: boolean) => void;
	hideTitle?: boolean;
}

export default function FilterSidebar({
	selectedArea,
	setSelectedArea,
	experience,
	setExperience,
	hasInternational,
	setHasInternational,
	hideTitle = false,
}: FilterSidebarProps) {
	const [selectedStack, setSelectedStack] = useState("");

	return (
		<div className="space-y-6 bg-card/50 border border-border rounded-lg p-4">
			{!hideTitle && (
				<div className="flex items-center gap-2 mb-6">
					<Code className="w-5 h-5 text-primary" />
					<h2 className="text-lg font-semibold">Filtros</h2>
				</div>
			)}
			<div className="space-y-6">
				<div className="space-y-3">
					<p className="text-sm font-medium">Área de Atuação</p>
					<div className="grid grid-cols-1 gap-2 mt-2">
						{Object.keys(salaryData).map((area) => {
							const IconComponent = areaIcons[area as keyof typeof areaIcons];
							const isSelected = selectedArea === area;
							return (
								<button
									key={area}
									type="button"
									onClick={() => setSelectedArea(area)}
									className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
										isSelected
											? "border-primary bg-primary text-white font-medium"
											: "border-border hover:border-primary/50 hover:bg-accent/50 text-foreground"
									}`}
								>
									<IconComponent className="w-4 h-4 flex-shrink-0" />
									<span className="text-sm truncate">{area}</span>
								</button>
							);
						})}
					</div>
				</div>

				<div className="space-y-3">
					<p className="text-sm font-medium">
						Experiência: {experience[0]} anos
					</p>
					<Slider
						value={experience}
						onValueChange={setExperience}
						max={15}
						min={0}
						step={1}
						className="w-full mt-2"
					/>
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>0</span>
						<span>15+</span>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<p className="text-sm font-medium">Experiência Internacional</p>
					<Switch
						checked={hasInternational}
						onCheckedChange={setHasInternational}
						className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted border border-primary/50 shadow-sm transition-colors"
					/>
				</div>

				<div className="space-y-3">
					<p className="text-sm font-medium">Stack Principal</p>
					<Select value={selectedStack} onValueChange={setSelectedStack}>
						<SelectTrigger className="bg-background border-primary/50 hover:border-primary focus:ring-2 focus:ring-primary/60 text-foreground">
							<SelectValue placeholder="Selecione uma stack" />
						</SelectTrigger>
						<SelectContent className="bg-card text-foreground border border-primary/30 shadow-lg">
							{stackData.map((stack) => (
								<SelectItem key={stack} value={stack}>
									{stack}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}
