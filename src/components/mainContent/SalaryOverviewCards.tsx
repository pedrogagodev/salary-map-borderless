import { DollarSign, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export function SalaryOverviewCards({
	calculatedSalary,
}: {
	calculatedSalary: { min: number; avg: number; max: number };
}) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
			<Card className="border-primary/20">
				<CardContent className="p-4 sm:p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Mínimo</p>
							<p className="text-xl sm:text-2xl font-bold text-foreground">
								R$ {calculatedSalary.min.toLocaleString()}
							</p>
						</div>
						<DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
					</div>
				</CardContent>
			</Card>

			<Card className="border-secondary/20">
				<CardContent className="p-4 sm:p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Média</p>
							<p className="text-xl sm:text-2xl font-bold text-foreground">
								R$ {calculatedSalary.avg.toLocaleString()}
							</p>
						</div>
						<TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
					</div>
				</CardContent>
			</Card>

			<Card className="border-accent/20">
				<CardContent className="p-4 sm:p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Máximo</p>
							<p className="text-xl sm:text-2xl font-bold text-foreground">
								R$ {calculatedSalary.max.toLocaleString()}
							</p>
						</div>
						<Users className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
