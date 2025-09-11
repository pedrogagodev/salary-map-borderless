export interface CountrySalaryData {
	min: number;
	avg: number;
	max: number;
	currency: string;
	multiplier: number;
}

export const countrySalaryData: Record<string, CountrySalaryData> = {
	"United States of America": {
		min: 80000,
		avg: 120000,
		max: 200000,
		currency: "USD",
		multiplier: 6.0,
	},
	"United States": {
		min: 80000,
		avg: 120000,
		max: 200000,
		currency: "USD",
		multiplier: 6.0,
	},
	Canada: {
		min: 70000,
		avg: 95000,
		max: 150000,
		currency: "CAD",
		multiplier: 5.2,
	},
	Mexico: {
		min: 15000,
		avg: 25000,
		max: 40000,
		currency: "USD",
		multiplier: 1.8,
	},

	Brazil: {
		min: 5000,
		avg: 9000,
		max: 15000,
		currency: "BRL",
		multiplier: 1.0,
	},
	Argentina: {
		min: 4000,
		avg: 7000,
		max: 12000,
		currency: "USD",
		multiplier: 0.8,
	},
	Chile: {
		min: 6000,
		avg: 10000,
		max: 16000,
		currency: "USD",
		multiplier: 1.1,
	},
	Colombia: {
		min: 3500,
		avg: 6000,
		max: 10000,
		currency: "USD",
		multiplier: 0.7,
	},
	Peru: { min: 3000, avg: 5500, max: 9000, currency: "USD", multiplier: 0.6 },
	Uruguay: {
		min: 4500,
		avg: 7500,
		max: 12000,
		currency: "USD",
		multiplier: 0.8,
	},

	Germany: {
		min: 55000,
		avg: 75000,
		max: 120000,
		currency: "EUR",
		multiplier: 4.2,
	},
	"United Kingdom": {
		min: 50000,
		avg: 70000,
		max: 110000,
		currency: "GBP",
		multiplier: 3.9,
	},
	France: {
		min: 45000,
		avg: 65000,
		max: 100000,
		currency: "EUR",
		multiplier: 3.6,
	},
	Netherlands: {
		min: 50000,
		avg: 70000,
		max: 110000,
		currency: "EUR",
		multiplier: 3.9,
	},
	Switzerland: {
		min: 80000,
		avg: 110000,
		max: 180000,
		currency: "CHF",
		multiplier: 6.1,
	},
	Sweden: {
		min: 45000,
		avg: 65000,
		max: 100000,
		currency: "SEK",
		multiplier: 3.6,
	},
	Norway: {
		min: 55000,
		avg: 75000,
		max: 120000,
		currency: "NOK",
		multiplier: 4.2,
	},
	Denmark: {
		min: 50000,
		avg: 70000,
		max: 110000,
		currency: "DKK",
		multiplier: 3.9,
	},
	Austria: {
		min: 45000,
		avg: 65000,
		max: 100000,
		currency: "EUR",
		multiplier: 3.6,
	},
	Belgium: {
		min: 45000,
		avg: 65000,
		max: 100000,
		currency: "EUR",
		multiplier: 3.6,
	},
	Italy: {
		min: 35000,
		avg: 50000,
		max: 80000,
		currency: "EUR",
		multiplier: 2.8,
	},
	Spain: {
		min: 30000,
		avg: 45000,
		max: 70000,
		currency: "EUR",
		multiplier: 2.5,
	},
	Portugal: {
		min: 25000,
		avg: 35000,
		max: 55000,
		currency: "EUR",
		multiplier: 1.9,
	},
	Poland: {
		min: 20000,
		avg: 30000,
		max: 50000,
		currency: "PLN",
		multiplier: 1.7,
	},
	"Czech Republic": {
		min: 18000,
		avg: 28000,
		max: 45000,
		currency: "CZK",
		multiplier: 1.6,
	},
	Hungary: {
		min: 15000,
		avg: 25000,
		max: 40000,
		currency: "HUF",
		multiplier: 1.4,
	},
	Romania: {
		min: 12000,
		avg: 20000,
		max: 35000,
		currency: "RON",
		multiplier: 1.1,
	},
	Bulgaria: {
		min: 10000,
		avg: 18000,
		max: 30000,
		currency: "BGN",
		multiplier: 1.0,
	},
	Croatia: {
		min: 12000,
		avg: 20000,
		max: 35000,
		currency: "HRK",
		multiplier: 1.1,
	},
	Slovenia: {
		min: 15000,
		avg: 25000,
		max: 40000,
		currency: "EUR",
		multiplier: 1.4,
	},
	Slovakia: {
		min: 12000,
		avg: 20000,
		max: 35000,
		currency: "EUR",
		multiplier: 1.1,
	},
	Estonia: {
		min: 15000,
		avg: 25000,
		max: 40000,
		currency: "EUR",
		multiplier: 1.4,
	},
	Latvia: {
		min: 12000,
		avg: 20000,
		max: 35000,
		currency: "EUR",
		multiplier: 1.1,
	},
	Lithuania: {
		min: 12000,
		avg: 20000,
		max: 35000,
		currency: "EUR",
		multiplier: 1.1,
	},
	Finland: {
		min: 45000,
		avg: 65000,
		max: 100000,
		currency: "EUR",
		multiplier: 3.6,
	},
	Ireland: {
		min: 50000,
		avg: 70000,
		max: 110000,
		currency: "EUR",
		multiplier: 3.9,
	},
	Iceland: {
		min: 45000,
		avg: 65000,
		max: 100000,
		currency: "ISK",
		multiplier: 3.6,
	},
	Luxembourg: {
		min: 60000,
		avg: 85000,
		max: 130000,
		currency: "EUR",
		multiplier: 4.7,
	},
	Malta: {
		min: 25000,
		avg: 35000,
		max: 55000,
		currency: "EUR",
		multiplier: 1.9,
	},

	Japan: {
		min: 40000,
		avg: 60000,
		max: 100000,
		currency: "JPY",
		multiplier: 3.3,
	},
	"South Korea": {
		min: 35000,
		avg: 50000,
		max: 80000,
		currency: "KRW",
		multiplier: 2.8,
	},
	"Hong Kong": {
		min: 40000,
		avg: 60000,
		max: 95000,
		currency: "HKD",
		multiplier: 3.3,
	},
	Taiwan: {
		min: 25000,
		avg: 40000,
		max: 65000,
		currency: "TWD",
		multiplier: 2.2,
	},
	India: {
		min: 8000,
		avg: 15000,
		max: 30000,
		currency: "INR",
		multiplier: 0.8,
	},
	Malaysia: {
		min: 12000,
		avg: 20000,
		max: 35000,
		currency: "MYR",
		multiplier: 1.1,
	},
	Thailand: {
		min: 10000,
		avg: 18000,
		max: 30000,
		currency: "THB",
		multiplier: 1.0,
	},
	Philippines: {
		min: 8000,
		avg: 15000,
		max: 25000,
		currency: "PHP",
		multiplier: 0.8,
	},
	Vietnam: {
		min: 6000,
		avg: 12000,
		max: 20000,
		currency: "VND",
		multiplier: 0.7,
	},
	Indonesia: {
		min: 5000,
		avg: 10000,
		max: 18000,
		currency: "IDR",
		multiplier: 0.6,
	},
	Israel: {
		min: 45000,
		avg: 65000,
		max: 100000,
		currency: "ILS",
		multiplier: 3.6,
	},
	"Saudi Arabia": {
		min: 30000,
		avg: 45000,
		max: 70000,
		currency: "SAR",
		multiplier: 2.5,
	},
	Turkey: {
		min: 15000,
		avg: 25000,
		max: 40000,
		currency: "TRY",
		multiplier: 1.4,
	},
	Russia: {
		min: 12000,
		avg: 20000,
		max: 35000,
		currency: "RUB",
		multiplier: 1.1,
	},
	Kazakhstan: {
		min: 8000,
		avg: 15000,
		max: 25000,
		currency: "KZT",
		multiplier: 0.8,
	},
	Uzbekistan: {
		min: 3000,
		avg: 6000,
		max: 10000,
		currency: "UZS",
		multiplier: 0.3,
	},

	"South Africa": {
		min: 15000,
		avg: 25000,
		max: 40000,
		currency: "ZAR",
		multiplier: 1.4,
	},
	Nigeria: {
		min: 8000,
		avg: 15000,
		max: 25000,
		currency: "NGN",
		multiplier: 0.8,
	},
	Egypt: {
		min: 6000,
		avg: 12000,
		max: 20000,
		currency: "EGP",
		multiplier: 0.7,
	},
	Morocco: {
		min: 5000,
		avg: 10000,
		max: 18000,
		currency: "MAD",
		multiplier: 0.6,
	},
	Kenya: { min: 4000, avg: 8000, max: 15000, currency: "KES", multiplier: 0.4 },
	Ghana: { min: 3000, avg: 6000, max: 12000, currency: "GHS", multiplier: 0.3 },
	Tunisia: {
		min: 3000,
		avg: 6000,
		max: 12000,
		currency: "TND",
		multiplier: 0.3,
	},
	Algeria: {
		min: 2500,
		avg: 5000,
		max: 10000,
		currency: "DZD",
		multiplier: 0.3,
	},

	"New Zealand": {
		min: 50000,
		avg: 70000,
		max: 110000,
		currency: "NZD",
		multiplier: 3.9,
	},
};

export function getCountrySalaryData(countryName: string): CountrySalaryData {
	if (countrySalaryData[countryName]) {
		return countrySalaryData[countryName];
	}

	const variations = [
		countryName.replace("Republic of ", ""),
		countryName.replace("United States of America", "United States"),
		countryName.replace("Democratic Republic of the Congo", "Congo"),
		countryName.replace("Côte d'Ivoire", "Ivory Coast"),
	];

	for (const variation of variations) {
		if (countrySalaryData[variation]) {
			return countrySalaryData[variation];
		}
	}

	return countrySalaryData.UnitedStates;
}

export function convertToBRL(
	salary: number,
	countryData: CountrySalaryData,
): number {
	if (countryData.currency === "BRL") {
		return salary;
	}

	// Approximate exchange rates (in relation to BRL)
	const exchangeRates: Record<string, number> = {
		USD: 5.2,
		EUR: 5.7,
		GBP: 6.6,
		CAD: 3.8,
		CHF: 5.8,
		SEK: 0.5,
		NOK: 0.5,
		DKK: 0.8,
		PLN: 1.3,
		CZK: 0.23,
		HUF: 0.014,
		RON: 1.1,
		BGN: 2.9,
		HRK: 0.75,
		ISK: 0.038,
		JPY: 0.035,
		KRW: 0.004,
		SGD: 3.8,
		HKD: 0.66,
		TWD: 0.16,
		CNY: 0.72,
		INR: 0.063,
		MYR: 1.1,
		THB: 0.14,
		PHP: 0.093,
		VND: 0.00021,
		IDR: 0.00033,
		ILS: 1.4,
		AED: 1.4,
		SAR: 1.4,
		TRY: 0.17,
		RUB: 0.055,
		KZT: 0.011,
		UZS: 0.00042,
		ZAR: 0.28,
		NGN: 0.0036,
		EGP: 0.17,
		MAD: 0.52,
		KES: 0.038,
		GHS: 0.42,
		TND: 1.7,
		DZD: 0.039,
		AUD: 3.4,
		NZD: 3.1,
	};

	const rate = exchangeRates[countryData.currency] || 1;
	return Math.round(salary * rate);
}

export function calculateCountrySalary(
	baseSalary: { min: number; avg: number; max: number },
	countryName: string,
): { min: number; avg: number; max: number } {
	const countryData = getCountrySalaryData(countryName);

	if (countryName === "Brazil" || countryData.currency === "BRL") {
		return baseSalary;
	}

	return {
		min: Math.round(baseSalary.min * countryData.multiplier),
		avg: Math.round(baseSalary.avg * countryData.multiplier),
		max: Math.round(baseSalary.max * countryData.multiplier),
	};
}
