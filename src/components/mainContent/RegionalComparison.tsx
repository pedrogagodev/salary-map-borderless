import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Line, LineChart } from "recharts";
import { Globe } from "lucide-react";
import { ResponsiveContainer } from "recharts";
import { CartesianGrid } from "recharts";
import { XAxis } from "recharts";
import { YAxis } from "recharts";
import { Tooltip } from "recharts";

interface RegionData {
	region: string;
	salary: number;
}

interface RegionalComparisonProps {
	selectedArea: string;
	regionChartData: RegionData[];
}

export function RegionalComparison({
	selectedArea,
	regionChartData,
}: RegionalComparisonProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Globe className="w-5 h-5" />
					Salários por Região - {selectedArea}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="h-48 sm:h-64">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={regionChartData}>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="rgba(255,255,255,0.15)"
							/>
							<XAxis
								dataKey="region"
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
							<Tooltip
								contentStyle={{
									backgroundColor: "hsl(var(--card))",
									border: "1px solid hsl(var(--border))",
									borderRadius: "8px",
								}}
								labelStyle={{ color: "#ffffff" }}
								itemStyle={{ color: "#ffffff" }}
							/>
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
			</CardContent>
		</Card>
	);
}
