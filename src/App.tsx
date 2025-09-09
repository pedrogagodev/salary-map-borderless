import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "./components/FilterSidebar";
import { salaryData } from "./utils/dataArea";
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

const regionData = [
	{ region: "Brasil", multiplier: 1.0, color: "#28d3a0" },
	{ region: "EUA", multiplier: 3.5, color: "#4814b0" },
	{ region: "Europa", multiplier: 2.8, color: "#f59e0b" },
	{ region: "Ásia", multiplier: 2.2, color: "#dc2626" },
];

export default function SalaryAnalyzer() {
	const [selectedArea, setSelectedArea] = useState("Backend");
	const [experience, setExperience] = useState([3]);
	const [hasInternational, setHasInternational] = useState(false);
	const [selectedRegion, setSelectedRegion] = useState("Brasil");
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
		const regionMultiplier =
			regionData.find((r) => r.region === selectedRegion)?.multiplier || 1;

		return {
			min: Math.round(
				base.min * expMultiplier * intlMultiplier * regionMultiplier,
			),
			avg: Math.round(
				base.avg * expMultiplier * intlMultiplier * regionMultiplier,
			),
			max: Math.round(
				base.max * expMultiplier * intlMultiplier * regionMultiplier,
			),
		};
	}, [selectedArea, experienceRange, hasInternational, selectedRegion]);

	const chartData = useMemo(() => {
		return Object.entries(salaryData).map(([area, data]) => ({
			area,
			salario_base: data.avg,
			salario_internacional: Math.round(data.avg * data.intl_multiplier),
		}));
	}, []);

	const regionChartData = useMemo(() => {
		const base = salaryData[selectedArea as keyof typeof salaryData];
		return regionData.map((region) => ({
			...region,
			salary: Math.round(base.avg * region.multiplier),
		}));
	}, [selectedArea]);

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
					<div
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
							<SalaryOverviewCards calculatedSalary={calculatedSalary} />

							<SalaryGlobalMap
								selectedRegion={selectedRegion}
								setSelectedRegion={setSelectedRegion}
								regionData={regionData}
							/>

							<SalaryComparisonChart chartData={chartData} />

							<RegionalComparison
								selectedArea={selectedArea}
								regionChartData={regionChartData}
							/>

							<InternationalImpact
								hasInternational={hasInternational}
								calculatedSalary={calculatedSalary}
								selectedArea={selectedArea}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
