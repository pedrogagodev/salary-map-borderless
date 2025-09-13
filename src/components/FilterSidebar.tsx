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
import { getCategories, getRolesByCategory } from "../utils/salaryDataUtils";
import type { SalaryData, Category, RoleName } from "../types/salaryTypes";
import { useEffect } from "react";
import {
	Brain,
	Settings,
	Smartphone,
	Cloud,
	Database,
	Shield,
} from "lucide-react";

const categoryIcons: Record<Category, React.ComponentType<{ className?: string }>> = {
	'Frontend': Code,
	'Backend': Code,
	'Full-stack': Code,
	'AI/ML': Brain,
	'Data': Database,
	'Cloud': Cloud,
	'Security': Shield,
	'DevOps': Settings,
	'Web3': Code,
	'Mobile': Smartphone,
	'Management': Settings,
};


interface FilterSidebarProps {
	selectedCategory: Category;
	setSelectedCategory: (category: Category) => void;
	selectedRole: RoleName | null;
	setSelectedRole: (role: RoleName | null) => void;
	experience: number[];
	setExperience: (experience: number[]) => void;
	hasInternational: boolean;
	setHasInternational: (hasInternational: boolean) => void;
	newSalaryData: SalaryData;
	hideTitle?: boolean;
}

export default function FilterSidebar({
	selectedCategory,
	setSelectedCategory,
	selectedRole,
	setSelectedRole,
	experience,
	setExperience,
	hasInternational,
	setHasInternational,
	newSalaryData,
	hideTitle = false,
}: FilterSidebarProps) {
	
	const categories = getCategories(newSalaryData);
	const availableRoles = getRolesByCategory(newSalaryData, selectedCategory);
	
	useEffect(() => {
		if (selectedRole && !availableRoles.includes(selectedRole)) {
			setSelectedRole(null);
		}
	}, [selectedRole, availableRoles, setSelectedRole]);

	return (
		<div className="space-y-4 bg-card/50 border border-border rounded-lg p-3">
			{!hideTitle && (
				<div className="flex items-center gap-2 mb-4">
					<Code className="w-5 h-5 text-primary" />
					<h2 className="text-lg font-semibold">Filtros</h2>
				</div>
			)}
			<div className="space-y-4">
				<div className="space-y-2">
					<p className="text-sm font-medium">Categoria</p>
					<div className="grid grid-cols-1 gap-1.5 mt-2">
						{categories.map((category) => {
							const IconComponent = categoryIcons[category];
							const isSelected = selectedCategory === category;
							return (
								<button
									key={category}
									type="button"
									onClick={() => setSelectedCategory(category)}
									className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all text-left ${
										isSelected
											? "border-primary bg-primary text-white font-medium"
											: "border-border hover:border-primary/50 hover:bg-accent/50 text-foreground"
									}`}
								>
									<IconComponent className="w-4 h-4 flex-shrink-0" />
									<span className="text-sm truncate">{category}</span>
								</button>
							);
						})}
					</div>
				</div>

				<div className="space-y-2">
					<p className="text-sm font-medium">Stack Específica</p>
					<Select value={selectedRole || ""} onValueChange={(value) => setSelectedRole(value as RoleName)}>
						<SelectTrigger className="bg-background border-primary/50 hover:border-primary focus:ring-2 focus:ring-primary/60 text-foreground">
							<SelectValue placeholder="Selecione uma stack" />
						</SelectTrigger>
						<SelectContent className="bg-card text-foreground border border-primary/30 shadow-lg">
							{availableRoles.map((role) => (
								<SelectItem key={role} value={role}>
									{role}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>


				<div className="space-y-2">
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
						size="lg"
						checked={hasInternational}
						onCheckedChange={setHasInternational}
						className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted border border-primary/50 shadow-sm transition-colors"
					/>
				</div>

			</div>
		</div>
	);
}
