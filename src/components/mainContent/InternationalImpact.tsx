import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { salaryData } from "../../utils/dataArea";

export function InternationalImpact({
	hasInternational,
	calculatedSalary,
	selectedArea,
}: {
	hasInternational: boolean;
	calculatedSalary: { min: number; avg: number; max: number };
	selectedArea: string;
}) {
	return (
		<>
			{hasInternational && (
				<Card className="border-secondary/30 bg-secondary/5">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-foreground">
							<MapPin className="w-5 h-5 text-secondary" />
							Impacto da Experiência Internacional
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="text-center p-4 rounded-lg bg-card border border-border">
								<p className="text-sm text-muted-foreground">
									Sem Experiência Internacional
								</p>
								<p className="text-lg sm:text-xl font-bold text-foreground">
									R${" "}
									{Math.round(
										calculatedSalary.avg /
											salaryData[selectedArea as keyof typeof salaryData]
												.intl_multiplier,
									).toLocaleString()}
								</p>
							</div>
							<div className="text-center p-4 rounded-lg bg-secondary/10 border border-secondary/20">
								<p className="text-sm text-muted-foreground">
									Com Experiência Internacional
								</p>
								<p className="text-lg sm:text-xl font-bold text-foreground">
									R$ {calculatedSalary.avg.toLocaleString()}
								</p>
								<p className="text-sm text-secondary mt-1 font-medium">
									+
									{Math.round(
										(salaryData[selectedArea as keyof typeof salaryData]
											.intl_multiplier -
											1) *
											100,
									)}
									% de aumento
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			)}
		</>
	);
}
