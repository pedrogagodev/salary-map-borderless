import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "./components/FilterSidebar";
import { salaryData } from "./utils/dataArea";
import { calculateCountrySalary } from "./utils/countrySalaryData";
import {
	SalaryOverviewCards,
	SalaryGlobalMap,
	SalaryComparisonChart,
	RegionalComparison,
	InternationalImpact,
} from "./components/mainContent";

const experienceMultipliers = {
	"0-2": 0.7,
	"2-5": 1.0,
	"5-7": 1.3,
	"7-12": 1.6,
	"12+": 2.0,
};

const countryData = [
	{ country: "Brasil", multiplier: 1.0, color: "#28d3a0" },
	{ country: "EUA", multiplier: 3.5, color: "#4814b0" },
	{ country: "Europa", multiplier: 2.8, color: "#f59e0b" },
	{ country: "Ásia", multiplier: 2.2, color: "#dc2626" },
];

function getCountrySalaryForArea(area: string, countryName: string): number {
	const areaData = salaryData[area as keyof typeof salaryData];
	if (!areaData) return 0;

	const baseSalary = { min: areaData.min, avg: areaData.avg, max: areaData.max };
	const calculatedSalary = calculateCountrySalary(baseSalary, countryName);
	
	return calculatedSalary.avg;
}

export default function SalaryAnalyzer() {
	const [selectedArea, setSelectedArea] = useState("Backend");
	const [experience, setExperience] = useState([3]);
	const [hasInternational, setHasInternational] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState("Brazil");
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

	const experienceRange = useMemo(() => {
		const years = experience[0];
		if (years <= 2) return "0-2";
		if (years <= 5) return "2-5";
		if (years <= 7) return "5-7";
		if (years <= 12) return "7-12";
		return "12+";
	}, [experience]);

	const calculatedSalary = useMemo(() => {
		const base = salaryData[selectedArea as keyof typeof salaryData];
		const expMultiplier =
			experienceMultipliers[
				experienceRange as keyof typeof experienceMultipliers
			];
		const intlMultiplier = hasInternational ? base.intl_multiplier : 1;

		const baseSalary = {
			min: Math.round(base.min * expMultiplier * intlMultiplier),
			avg: Math.round(base.avg * expMultiplier * intlMultiplier),
			max: Math.round(base.max * expMultiplier * intlMultiplier),
		};

		return calculateCountrySalary(baseSalary, selectedCountry);
	}, [selectedArea, experienceRange, hasInternational, selectedCountry]);

	const chartData = useMemo(() => {
		return Object.entries(salaryData).map(([area]) => {
			const nationalSalary = getCountrySalaryForArea(area, selectedCountry);
			const usaSalary = getCountrySalaryForArea(area, "United States");
			
			return {
				area,
				salario_base: nationalSalary,
				salario_internacional: usaSalary,
			};
		});
	}, [selectedCountry]);

	const countryChartData = useMemo(() => {
		const baseCountries = countryData.map((country) => {
			let countryForCalculation = country.country;
			if (country.country === "Brasil") countryForCalculation = "Brazil";
			if (country.country === "EUA") countryForCalculation = "United States";
			
			return {
				country: country.country,
				salary: getCountrySalaryForArea(selectedArea, countryForCalculation),
			};
		});

		const selectedCountryName = selectedCountry;
		const isSelectedCountryInList = baseCountries.some(item => 
			item.country.toLowerCase() === selectedCountryName.toLowerCase() ||
			(selectedCountryName === "Brazil" && item.country === "Brasil") ||
			(selectedCountryName === "United States" && item.country === "EUA")
		);

		if (!isSelectedCountryInList && selectedCountryName !== "Brazil" && selectedCountryName !== "United States") {
			const selectedCountrySalary = getCountrySalaryForArea(selectedArea, selectedCountryName);
			baseCountries.push({
				country: selectedCountryName,
				salary: selectedCountrySalary,
			});
		}

		return baseCountries;
	}, [selectedArea, selectedCountry]);

	return (
		<div className="min-h-screen bg-background text-foreground">
			<header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/borderless_logo-2zZ2VejjnqtybjwUI5pfa6Vcr8fnPX.png"
								alt="Borderless"
								className="h-8 w-8"
							/>
							<h1 className="text-xl font-bold text-foreground">
								Salary Analyzer
							</h1>
						</div>
						<div className="flex items-center gap-3">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setIsMobileSidebarOpen(true)}
								className="lg:hidden flex items-center gap-2"
							>
								<Filter className="w-4 h-4" />
								Filtros
							</Button>
							<Badge variant="secondary" className="hidden sm:flex">
								<TrendingUp className="w-4 h-4 mr-1" />
								Live Data
							</Badge>
						</div>
					</div>
				</div>
			</header>

			<div className="flex">
				<div className="hidden lg:block w-96 bg-background fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto z-40">
					<div className="p-6 pt-8">
						<FilterSidebar
							selectedArea={selectedArea}
							setSelectedArea={setSelectedArea}
							experience={experience}
							setExperience={setExperience}
							hasInternational={hasInternational}
							setHasInternational={setHasInternational}
						/>
					</div>
				</div>

				{isMobileSidebarOpen && (
					<Button
						className="fixed inset-0 bg-black/50 z-50 lg:hidden"
						onClick={() => setIsMobileSidebarOpen(false)}
					/>
				)}

				<div
					className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-background border-r border-border z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
						isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
					}`}
				>
					<div className="flex items-center justify-between p-4 border-b border-border">
						<h2 className="text-lg font-semibold">Filtros</h2>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsMobileSidebarOpen(false)}
							className="h-8 w-8 p-0"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
					<div className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
						<FilterSidebar
							selectedArea={selectedArea}
							setSelectedArea={setSelectedArea}
							experience={experience}
							setExperience={setExperience}
							hasInternational={hasInternational}
							setHasInternational={setHasInternational}
							hideTitle={true}
						/>
					</div>
				</div>

				<div className="flex-1 lg:ml-96">
					<div className="container mx-auto px-4 py-8">
						<div className="space-y-6">
							<SalaryOverviewCards
								calculatedSalary={calculatedSalary}
								selectedCountry={selectedCountry}
							/>

							<SalaryGlobalMap
								selectedCountry={selectedCountry}
								setSelectedCountry={setSelectedCountry}
								countryData={countryData}
							/>

							<InternationalImpact
								hasInternational={hasInternational}
								calculatedSalary={calculatedSalary}
								selectedArea={selectedArea}
							/>

							<SalaryComparisonChart 
								chartData={chartData} 
								selectedCountry={selectedCountry}
							/>

							<RegionalComparison
								selectedArea={selectedArea}
								regionChartData={countryChartData}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
