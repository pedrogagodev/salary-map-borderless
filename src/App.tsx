import { useMemo, useEffect, useCallback } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "./components/FilterSidebar";
import { getSalaryData } from "./services/salaryDataService";
import { getSalary, getSalaryByContinent, getRolesByCategory, mapCountryNameToCode } from "./utils/salaryDataUtils";
import type { Category, ExperienceLevel, CountryCode, Continent } from "./types/salaryTypes";
import { useFilters } from "./contexts/Filters";

import {
	SalaryOverviewCards,
	SalaryGlobalMap,
	SalaryComparisonChart,
	RegionalComparison,
	InternationalImpact,
} from "./components/mainContent";


const countryData = [
	{ country: "EUA", multiplier: 3.5, color: "#4814b0" },
	{ country: "Europa", multiplier: 2.8, color: "#f59e0b" },
	{ country: "Ásia", multiplier: 2.2, color: "#dc2626" },
];


export default function SalaryAnalyzer() {
	const { state, setRole, openSidebar, closeSidebar, toggleComparisonType, setSelectedCountry } = useFilters();
	const { 
		selectedCategory, 
		selectedRole, 
		experience, 
		hasInternational, 
		selectedCountry, 
		isMobileSidebarOpen, 
		comparisonType 
	} = state;
	
	const newSalaryData = getSalaryData();
	
	const getExperienceLevel = useCallback((years: number): ExperienceLevel => {
		if (years <= 2) return "Junior";
		if (years <= 5) return "Mid";
		if (years <= 7) return "Senior";
		if (years <= 12) return "Staff";
		return "Principal";
	}, []);
	

	useEffect(() => {
		if (selectedCategory && !selectedRole) {
			const availableRoles = getRolesByCategory(newSalaryData, selectedCategory);
			if (availableRoles.length > 0) {
				setRole(availableRoles[0]);
			}
		}
	}, [selectedCategory, selectedRole, newSalaryData, setRole]);

	useEffect(() => {
		if (isMobileSidebarOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileSidebarOpen]);


	const calculatedSalary = useMemo(() => {
		if (selectedRole) {
			const countryCode = mapCountryNameToCode(selectedCountry, newSalaryData);
			const experienceLevel = getExperienceLevel(experience[0]);
			
			if (countryCode) {
				const salary = getSalary(newSalaryData, selectedRole, countryCode, experienceLevel);
				
				if (salary !== null) {
					const intlMultiplier = hasInternational ? 1.2 : 1.0; 
					const adjustedSalary = Math.round(salary * intlMultiplier);
					
					return {
						min: Math.round(adjustedSalary * 0.8),
						avg: adjustedSalary,
						max: Math.round(adjustedSalary * 1.2),
					};
				}
			}
			
			const continentMapping: Record<string, Continent> = {
				"Europa": "Europe",
				"Ásia": "Asia",
				"Europe": "Europe",
				"Asia": "Asia",
			};
			
			const continent = continentMapping[selectedCountry];
			
			if (continent) {
				const salary = getSalaryByContinent(newSalaryData, selectedRole, continent, experienceLevel);
				
				if (salary !== null) {
					const intlMultiplier = hasInternational ? 1.2 : 1.0;
					const adjustedSalary = Math.round(salary * intlMultiplier);
					
					return {
						min: Math.round(adjustedSalary * 0.8),
						avg: adjustedSalary,
						max: Math.round(adjustedSalary * 1.2),
					};
				}
			}
		}
		
		return {
			min: 5000,
			avg: 8000,
			max: 12000,
		};
	}, [selectedRole, hasInternational, selectedCountry, newSalaryData, experience, getExperienceLevel]);

	const chartData = useMemo(() => {
		const countryCode = mapCountryNameToCode(selectedCountry, newSalaryData);
		const experienceLevel = getExperienceLevel(experience[0]);
		
		if (!countryCode) return [];
		
		const intlMultiplier = 1.2;
		
		if (comparisonType === 'stacks') {
			const availableRoles = getRolesByCategory(newSalaryData, selectedCategory);
			
			return availableRoles.map(role => {
				const nationalSalary = getSalary(newSalaryData, role, countryCode, experienceLevel) || 0;
				const usaSalary = getSalary(newSalaryData, role, "USA", experienceLevel) || 0;
				
				return {
					area: role,
					salario_base: nationalSalary,
					salario_internacional: usaSalary,
					intlMultiplier,
				};
			});
		} else {
			const allCategories = Object.keys(newSalaryData.categories) as Category[];
			
			return allCategories
				.map(category => {
					const categoryRoles = getRolesByCategory(newSalaryData, category);
					if (categoryRoles.length === 0) return null;
					
					const nationalSalaries = categoryRoles
						.map(role => getSalary(newSalaryData, role, countryCode, experienceLevel) || 0)
						.filter(salary => salary > 0);
					
					const usaSalaries = categoryRoles
						.map(role => getSalary(newSalaryData, role, "USA", experienceLevel) || 0)
						.filter(salary => salary > 0);
					
					const avgNationalSalary = nationalSalaries.length > 0 
						? Math.round(nationalSalaries.reduce((sum, salary) => sum + salary, 0) / nationalSalaries.length)
						: 0;
					
					const avgUsaSalary = usaSalaries.length > 0 
						? Math.round(usaSalaries.reduce((sum, salary) => sum + salary, 0) / usaSalaries.length)
						: 0;
					
					return {
						area: category,
						salario_base: avgNationalSalary,
						salario_internacional: avgUsaSalary,
						intlMultiplier,
					};
				})
				.filter((item): item is NonNullable<typeof item> => item !== null);
		}
	}, [selectedCountry, selectedCategory, newSalaryData, experience, comparisonType, getExperienceLevel]);

	const countryChartData = useMemo(() => {
		const availableRoles = getRolesByCategory(newSalaryData, selectedCategory);
		const defaultRole = availableRoles[0];
		const experienceLevel = getExperienceLevel(experience[0]);
		
		if (!defaultRole) return [];
		
		const baseCountries = countryData.map((country) => {
			let countryCode: CountryCode | null = null;
			
			if (country.country === "EUA") {
				countryCode = "USA";
			} else if (country.country === "Europa") {
				const salary = getSalaryByContinent(newSalaryData, defaultRole, "Europe", experienceLevel);
				return {
					country: country.country,
					salary: salary || 0,
				};
			} else if (country.country === "Ásia") {
				const salary = getSalaryByContinent(newSalaryData, defaultRole, "Asia", experienceLevel);
				return {
					country: country.country,
					salary: salary || 0,
				};
			} else {
				countryCode = mapCountryNameToCode(country.country, newSalaryData);
			}
			
			const salary = countryCode ? getSalary(newSalaryData, defaultRole, countryCode, experienceLevel) : 0;
			
			return {
				country: country.country,
				salary: salary || 0,
			};
		});

		const selectedCountryName = selectedCountry;
		const isSelectedCountryInList = baseCountries.some(
			(item) =>
				item.country.toLowerCase() === selectedCountryName.toLowerCase() ||
				(selectedCountryName === "United States" && item.country === "EUA"),
		);

		if (!isSelectedCountryInList) {
			const countryCode = mapCountryNameToCode(selectedCountryName, newSalaryData);
			if (countryCode && defaultRole) {
				const salary = getSalary(newSalaryData, defaultRole, countryCode, experienceLevel);
				baseCountries.push({
					country: selectedCountryName,
					salary: salary || 0,
				});
			}
		}

		return baseCountries;
	}, [selectedCountry, selectedCategory, newSalaryData, experience, getExperienceLevel]);

	return (
		<div className="min-h-screen bg-background text-foreground">
			<header className="border-b border-border bg-card/50 backdrop-blur-sm sticky z-[500] top-0">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/borderless_logo-2zZ2VejjnqtybjwUI5pfa6Vcr8fnPX.png"
								alt="Borderless"
								className="h-8 w-8"
							/>
							<h1 className="text-xl font-bold text-foreground">
								Borderless Coding Salary Comparison
							</h1>
						</div>
						<div className="flex items-center gap-3">
							<Button
								variant="outline"
								size="sm"
								onClick={openSidebar}
								className="lg:hidden flex items-center gap-2"
							>
								<Filter className="w-4 h-4" />
								Filtros
							</Button>
						</div>
					</div>
				</div>
			</header>

			<div className="flex">
				{isMobileSidebarOpen && (
					<button
						type="button"
						className="fixed inset-0 bg-black/50 z-[1000] lg:hidden border-0 p-0 cursor-pointer"
						onClick={closeSidebar}
						onKeyDown={(e) => {
							if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
								closeSidebar();
							}
						}}
						aria-label="Fechar menu de filtros"
					/>
				)}

				<div className="hidden lg:block w-96 bg-background fixed left-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto">
					<div className="p-4 pt-6">
						<FilterSidebar
							newSalaryData={newSalaryData}
						/>
					</div>
				</div>

				<div
					className={`fixed top-0 left-0 h-[100dvh] w-80 max-w-[85vw] bg-background border-r border-border z-[1001] transform transition-transform duration-300 ease-in-out lg:hidden ${
						isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
					}`}
				>
					<div className="flex items-center justify-between p-4 border-b border-border">
						<h2 className="text-lg font-semibold">Filtros</h2>
						<Button
							variant="ghost"
							size="sm"
							onClick={closeSidebar}
							className="h-8 w-8 p-0"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
					<div className="p-4 overflow-y-auto h-[calc(100dvh-4rem)] pb-[env(safe-area-inset-bottom)]">
						<FilterSidebar
							newSalaryData={newSalaryData}
							hideTitle={true}
						/>
					</div>
				</div>

				<div className="flex-1 lg:ml-96">
					<div className="container mx-auto px-4 py-8">
						<div className="space-y-6">
							<SalaryOverviewCards
								calculatedSalary={calculatedSalary}
							/>

							<SalaryGlobalMap
								selectedCountry={selectedCountry}
								setSelectedCountry={setSelectedCountry}
								countryData={countryData}
							/>

							<InternationalImpact
								hasInternational={hasInternational}
								calculatedSalary={calculatedSalary}
							/>

							<SalaryComparisonChart
								chartData={chartData}
								selectedCountry={selectedCountry}
								hasInternational={hasInternational}
								onToggleComparisonType={toggleComparisonType}
								comparisonType={comparisonType}
							/>

							<RegionalComparison
								selectedArea={selectedCategory}
								regionChartData={countryChartData}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
