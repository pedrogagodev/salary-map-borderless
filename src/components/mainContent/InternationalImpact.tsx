import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useI18n } from "../../contexts/I18n";

export function InternationalImpact({
	hasInternational,
	calculatedSalary,
}: {
	hasInternational: boolean;
	calculatedSalary: { min: number; avg: number; max: number };
}) {
	const { t } = useI18n();
	return (
		<>
			{hasInternational && (
				<Card className="border-secondary/30 bg-secondary/5">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-foreground">
							<MapPin className="w-5 h-5 text-secondary" />
							{t.internationalExperienceImpact}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="text-center p-4 rounded-lg bg-card border border-border">
								<p className="text-sm text-muted-foreground">
									{t.withoutInternationalExperience}
								</p>
								<p className="text-lg sm:text-xl font-bold text-foreground">
									$ {Math.round(calculatedSalary.avg / 1.2).toLocaleString()}
								</p>
							</div>
							<div className="text-center p-4 rounded-lg bg-secondary/10 border border-secondary/20">
								<p className="text-sm text-muted-foreground">
									{t.withInternationalExperience}
								</p>
								<p className="text-lg sm:text-xl font-bold text-foreground">
									$ {calculatedSalary.avg.toLocaleString()}
								</p>
								<p className="text-sm text-secondary mt-1 font-medium">
									{t.increasePercentage}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			)}
		</>
	);
}
