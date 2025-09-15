import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Line, LineChart } from "recharts";
import { Globe } from "lucide-react";
import { ResponsiveContainer } from "recharts";
import { CartesianGrid } from "recharts";
import { XAxis } from "recharts";
import { YAxis } from "recharts";
import { Tooltip } from "recharts";
import { AnimatedContainer } from "../ui/animated-container";
import { useI18n } from "../../contexts/I18n";
import { getCountryTranslationKey } from "../../utils/countryMapping";

interface RegionData {
	country: string;
	salary: number;
}

interface RegionalComparisonProps {
	selectedArea: string;
	regionChartData: RegionData[];
}

interface RegionalTooltipPayload {
	dataKey: string;
	name?: string;
	value: number;
	color: string;
}

interface CustomRegionalTooltipProps {
	active?: boolean;
	payload?: RegionalTooltipPayload[];
	label?: string;
	salaryLabel?: string;
}

const CustomRegionalTooltip = ({ active, payload, label, salaryLabel }: CustomRegionalTooltipProps) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-card border border-border rounded-lg p-3 shadow-lg">
				<p className="text-foreground font-medium mb-2">{label}</p>
				{payload.map((entry) => (
					<div key={entry.dataKey} className="flex items-center gap-2">
						<div
							className="w-3 h-3 rounded-full"
							style={{ backgroundColor: entry.color }}
						/>
						<span className="text-sm text-foreground">
							{salaryLabel}: <span className="font-medium">$ {entry.value?.toLocaleString()}</span>
						</span>
					</div>
				))}
			</div>
		);
	}
	return null;
};

export function RegionalComparison({
	selectedArea,
	regionChartData,
}: RegionalComparisonProps) {
	const { t } = useI18n();
	
	const getTranslatedCountryName = (countryName: string): string => {
		const translationKey = getCountryTranslationKey(countryName);
		if (translationKey && t[translationKey as keyof typeof t]) {
			return t[translationKey as keyof typeof t] as string;
		}
		return countryName;
	};
	
	const translatedRegionData = regionChartData.map(item => ({
		...item,
		country: getTranslatedCountryName(item.country)
	}));
	return (
		<AnimatedContainer delay={0.8}>
			<Card>
				<CardHeader>
					<AnimatedContainer delay={0.9}>
						<CardTitle className="flex items-center gap-2">
							<Globe className="w-5 h-5" />
							{t.salaryByRegion} - {selectedArea}
						</CardTitle>
					</AnimatedContainer>
				</CardHeader>
				<CardContent>
					<AnimatedContainer delay={1.0}>
						<div className="h-48 sm:h-64">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={translatedRegionData}>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke="rgba(255,255,255,0.15)"
									/>
									<XAxis
										dataKey="country"
										stroke="#ffffff"
										tick={{ fill: "#ffffff", fontSize: 13 }}
										axisLine={{ stroke: "#ffffff" }}
										tickLine={{ stroke: "#ffffff" }}
									/>
									<YAxis
										stroke="#ffffff"
										tick={{ fill: "#ffffff", fontSize: 13 }}
										axisLine={{ stroke: "#ffffff" }}
										tickLine={{ stroke: "#ffffff" }}
									/>
									<Tooltip content={<CustomRegionalTooltip salaryLabel={t.salary} />} />
									<Line
										type="monotone"
										dataKey="salary"
										stroke="#60a5fa"
										strokeWidth={3}
										dot={{
											fill: "#60a5fa",
											stroke: "#ffffff",
											strokeWidth: 2,
											r: 5,
										}}
										activeDot={{ r: 7, stroke: "#ffffff", strokeWidth: 3 }}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</AnimatedContainer>
				</CardContent>
			</Card>
		</AnimatedContainer>
	);
}
