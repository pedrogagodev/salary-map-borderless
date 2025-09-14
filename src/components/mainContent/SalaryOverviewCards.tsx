import { DollarSign, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useI18n } from "../../contexts/I18n";

export function SalaryOverviewCards({
	calculatedSalary,
}: {
	calculatedSalary: { min: number; avg: number; max: number };
}) {
	const { t } = useI18n();
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<Card className="border-primary/20">
					<CardContent className="p-4 sm:p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">{t.minimum}</p>
								<p className="text-xl sm:text-2xl font-bold text-foreground">
									$ {calculatedSalary.min.toLocaleString()}
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
								<p className="text-sm text-muted-foreground">{t.average}</p>
								<p className="text-xl sm:text-2xl font-bold text-foreground">
									$ {calculatedSalary.avg.toLocaleString()}
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
								<p className="text-sm text-muted-foreground">{t.maximum}</p>
								<p className="text-xl sm:text-2xl font-bold text-foreground">
									$ {calculatedSalary.max.toLocaleString()}
								</p>
							</div>
							<Users className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
