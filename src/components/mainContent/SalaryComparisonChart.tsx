import { CardContent, CardHeader, CardTitle } from "../ui/card";

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

interface SalaryComparisonDatum {
	area: string;
	salario_base: number;
	salario_internacional: number;
}

interface SalaryComparisonChartProps {
	chartData: SalaryComparisonDatum[];
	selectedCountry?: string;
}

export function SalaryComparisonChart({
	chartData,
	selectedCountry = "País Selecionado",
}: SalaryComparisonChartProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<BarChart className="w-5 h-5" />
					Comparação Salarial por Área - {selectedCountry} vs EUA
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="h-64 sm:h-80">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={chartData}>
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
							<Tooltip
								contentStyle={{
									backgroundColor: "hsl(var(--card))",
									border: "1px solid hsl(var(--border))",
									borderRadius: "8px",
								}}
								labelStyle={{ color: "#ffffff" }}
								itemStyle={{ color: "#ffffff" }}
							/>
							<Bar dataKey="salario_base" fill="#60a5fa" name={selectedCountry} />
							<Bar
								dataKey="salario_internacional"
								fill="#f59e0b"
								stroke="#ffffff"
								strokeWidth={0.5}
								name="EUA"
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
