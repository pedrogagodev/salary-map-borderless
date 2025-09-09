import {
	Brain,
	Settings,
	Smartphone,
	Cloud,
	Database,
	Code,
	Shield,
} from "lucide-react";

export const salaryData = {
	Web3: { min: 8000, avg: 15000, max: 25000, intl_multiplier: 2.5 },
	Cloud: { min: 7000, avg: 12000, max: 20000, intl_multiplier: 2.2 },
	Dados: { min: 6000, avg: 11000, max: 18000, intl_multiplier: 2.0 },
	Backend: { min: 5000, avg: 9000, max: 15000, intl_multiplier: 1.8 },
	Frontend: { min: 5000, avg: 9000, max: 15000, intl_multiplier: 1.8 },
	Fullstack: { min: 5500, avg: 10000, max: 16000, intl_multiplier: 1.9 },
	IA: { min: 9000, avg: 16000, max: 28000, intl_multiplier: 2.8 },
	Mobile: { min: 4500, avg: 8500, max: 14000, intl_multiplier: 1.7 },
	"Engineering Manager": {
		min: 12000,
		avg: 20000,
		max: 35000,
		intl_multiplier: 2.5,
	},
	Cybersecurity: { min: 8500, avg: 14000, max: 22000, intl_multiplier: 2.3 },
};

export const areaIcons = {
	Web3: Code,
	Cloud: Cloud,
	Dados: Database,
	Backend: Code,
	Frontend: Code,
	Fullstack: Code,
	IA: Brain,
	Mobile: Smartphone,
	"Engineering Manager": Settings,
	Cybersecurity: Shield,
};
