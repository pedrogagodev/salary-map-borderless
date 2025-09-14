import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Card } from "../ui/card";
import { AnimatedContainer } from "../ui/animated-container";
import { simplifyStackName } from "../../utils/salaryDataUtils";
import { useI18n } from "../../contexts/I18n";

interface SalaryComparisonDatum {
	area: string;
	salario_base: number;
	salario_internacional: number;
	intlMultiplier?: number;
}

interface SalaryComparisonChartProps {
	chartData: SalaryComparisonDatum[];
	selectedCountry: string;
	hasInternational: boolean;
	onToggleComparisonType: () => void;
	comparisonType: 'stacks' | 'areas';
}

interface TooltipPayload {
	dataKey: string;
	name: string;
	value: number;
	color: string;
}

interface CustomTooltipProps {
	active?: boolean;
	payload?: TooltipPayload[];
	label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-card border border-border rounded-lg p-3 shadow-lg">
				<p className="text-foreground font-medium mb-2">{label}</p>
				{payload.map((entry) => (
					<div key={entry.dataKey} className="flex items-center gap-2 mb-1">
						<div
							className="w-3 h-3 rounded-sm"
							style={{ backgroundColor: entry.color }}
						/>
						<span className="text-sm text-foreground">
							{entry.name}: <span className="font-medium">$ {entry.value?.toLocaleString()}</span>
						</span>
					</div>
				))}
			</div>
		);
	}
	return null;
};



export function SalaryComparisonChart({
	chartData,
	selectedCountry,
	hasInternational,
	onToggleComparisonType,
	comparisonType,
}: SalaryComparisonChartProps) {
	const { t } = useI18n();
	const [showInternationalComparison, setShowInternationalComparison] = useState(false);

	const shouldShowInternationalButton = !hasInternational;
	const showComparison = hasInternational || showInternationalComparison;
	
	const processedChartData = chartData.map(item => {
		const simplifiedItem = {
			...item,
			area: comparisonType === 'stacks' ? simplifyStackName(item.area) : item.area,
		};
		
		if ((hasInternational || showInternationalComparison) && item.intlMultiplier) {
			return {
				...simplifiedItem,
				salario_base: item.salario_base,
				salario_internacional: item.salario_internacional * item.intlMultiplier,
			};
		}
		return simplifiedItem;
	});

	return (
		<AnimatedContainer delay={0.5}>
			<Card>
				<CardHeader>
					<AnimatedContainer delay={0.6}>
						<div className="flex items-center justify-between">
							<CardTitle className="flex items-center gap-2">
								<BarChart className="w-5 h-5" />
								{t.salaryComparisonWithInternational}
							</CardTitle>
							<div className="flex gap-2">
								<Button
									size="sm"
									variant="outline"
									onClick={onToggleComparisonType}
									className="text-sm transition-colors border border-primary/50 hover:border-primary"
								>
									{comparisonType === 'stacks' ? t.viewAreas : t.viewStacks}
								</Button>
								{shouldShowInternationalButton && (
									<Button
										size="sm"
										onClick={() => setShowInternationalComparison(!showInternationalComparison)}
										className={`text-sm transition-colors border ${
											showInternationalComparison 
												? "bg-[#3a1090] hover:bg-[#2d0a70] border-[#3a1090] text-white" 
												: "bg-[#4814b0] hover:bg-[#3a1090] border-[#4814b0] text-white"
										}`}
									>
										{t.addInternational}
									</Button>
								)}
							</div>
						</div>
					</AnimatedContainer>
				</CardHeader>
				<CardContent>
					<AnimatedContainer delay={0.7}>
						<div className="h-64 sm:h-80">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={processedChartData}>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke="rgba(255,255,255,0.15)"
									/>
									<XAxis
										dataKey="area"
										stroke="#ffffff"
										fontSize={12}
										angle={-45}
										textAnchor="end"
										height={80}
										tick={{ fill: "#ffffff", fontSize: 13 }}
										axisLine={{ stroke: "#ffffff" }}
										tickLine={{ stroke: "#ffffff" }}
									/>
									<YAxis
										stroke="#ffffff"
										fontSize={12}
										tick={{ fill: "#ffffff", fontSize: 13 }}
										axisLine={{ stroke: "#ffffff" }}
										tickLine={{ stroke: "#ffffff" }}
									/>
									<Tooltip content={<CustomTooltip />} />
									<Bar dataKey="salario_base" fill="#60a5fa" name={selectedCountry} />
									{showComparison && (
										<Bar
											dataKey="salario_internacional"
											fill="#f59e0b"
											stroke="#ffffff"
											strokeWidth={0.5}
											name={t.usa}
										/>
									)}
								</BarChart>
							</ResponsiveContainer>
						</div>
					</AnimatedContainer>
				</CardContent>
			</Card>
		</AnimatedContainer>
	);
}
