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
import { AnimatedContainer } from "./ui/animated-container";
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
import { useFilters } from "../contexts/Filters";
import { useI18n } from "../contexts/I18n";

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
	newSalaryData: SalaryData;
	hideTitle?: boolean;
}

export default function FilterSidebar({
	newSalaryData,
	hideTitle = false,
}: FilterSidebarProps) {
	const { state, setCategory, setRole, setExperience, setHasInternational } = useFilters();
	const { t } = useI18n();
	const { selectedCategory, selectedRole, experience, hasInternational } = state;
	
	const categories = getCategories(newSalaryData);
	const availableRoles = getRolesByCategory(newSalaryData, selectedCategory);
	
	useEffect(() => {
		if (selectedRole && !availableRoles.includes(selectedRole)) {
			setRole(null);
		}
	}, [selectedRole, availableRoles, setRole]);

	return (
		<AnimatedContainer delay={0.1}>
			<div className="space-y-4 bg-card/50 border border-border rounded-lg p-3">
				{!hideTitle && (
					<AnimatedContainer delay={0.2}>
						<div className="flex items-center gap-2 mb-4">
							<Code className="w-5 h-5 text-primary" />
							<h2 className="text-lg font-semibold">{t.filters}</h2>
						</div>
					</AnimatedContainer>
				)}
				<div className="space-y-4">
					<AnimatedContainer delay={0.3}>
						<div className="space-y-2">
							<p className="text-sm font-medium">{t.category}</p>
							<div className="grid grid-cols-1 gap-1.5 mt-2">
								{categories.map((category, index) => {
									const IconComponent = categoryIcons[category];
									const isSelected = selectedCategory === category;
									return (
										<AnimatedContainer key={category} delay={0.4 + index * 0.05}>
											<button
												type="button"
												onClick={() => setCategory(category)}
												className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all text-left w-full ${
													isSelected
														? "border-primary bg-primary text-white font-medium"
														: "border-border hover:border-primary/50 hover:bg-accent/50 text-foreground"
												}`}
											>
												<IconComponent className="w-4 h-4 flex-shrink-0" />
												<span className="text-sm truncate">{category}</span>
											</button>
										</AnimatedContainer>
									);
								})}
							</div>
						</div>
					</AnimatedContainer>

					<AnimatedContainer delay={0.6}>
						<div className="space-y-2">
							<p className="text-sm font-medium">{t.specificStack}</p>
							<Select value={selectedRole || ""} onValueChange={(value) => setRole(value as RoleName)}>
								<SelectTrigger className="bg-background border-primary/50 hover:border-primary focus:ring-2 focus:ring-primary/60 text-foreground">
									<SelectValue placeholder={t.selectStack} />
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
					</AnimatedContainer>

					<AnimatedContainer delay={0.7}>
						<div className="space-y-2">
							<p className="text-sm font-medium">
								{t.experience}: {experience[0]} {t.years}
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
					</AnimatedContainer>

					<AnimatedContainer delay={0.8}>
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium">{t.internationalExperience}</p>
							<Switch
								size="lg"
								checked={hasInternational}
								onCheckedChange={setHasInternational}
								className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted border border-primary/50 shadow-sm transition-colors"
							/>
						</div>
					</AnimatedContainer>

				</div>
			</div>
		</AnimatedContainer>
	);
}
