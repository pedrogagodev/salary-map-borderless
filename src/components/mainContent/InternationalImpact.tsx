import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AnimatedContainer } from "../ui/animated-container";
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
				<AnimatedContainer delay={0} duration={0.3}>
					<Card className="border-secondary/30 bg-secondary/5">
						<CardHeader>
							<AnimatedContainer delay={0.02} duration={0.3}>
								<CardTitle className="flex items-center gap-2 text-foreground">
									<MapPin className="w-5 h-5 text-secondary" />
									{t.internationalExperienceImpact}
								</CardTitle>
							</AnimatedContainer>
						</CardHeader>
						<CardContent>
							<AnimatedContainer delay={0.03} duration={0.3}>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
									<AnimatedContainer delay={0.04} duration={0.3}>
										<div className="text-center p-4 rounded-lg bg-card border border-border h-full flex flex-col justify-center">
											<p className="text-sm text-muted-foreground">
												{t.withoutInternationalExperience}
											</p>
											<p className="text-lg sm:text-xl font-bold text-foreground">
												$ {Math.round(calculatedSalary.avg / 1.2).toLocaleString()}
											</p>
											<span className="invisible select-none">{t.increasePercentage}</span>
										</div>
									</AnimatedContainer>
									<AnimatedContainer delay={0.05} duration={0.3}>
										<div className="text-center p-4 rounded-lg bg-secondary/10 border border-secondary/20 h-full flex flex-col justify-center">
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
									</AnimatedContainer>
								</div>
							</AnimatedContainer>
						</CardContent>
					</Card>
				</AnimatedContainer>
			)}
		</>
	);
}
