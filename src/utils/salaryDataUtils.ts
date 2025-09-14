import type { 
  SalaryData, 
  RoleName, 
  Category, 
  CountryCode, 
  ExperienceLevel, 
  Continent
} from '../types/salaryTypes';
import { COUNTRY_TO_CONTINENT } from '../types/salaryTypes';

export function getCategories(salaryData: SalaryData): Category[] {
  return Object.keys(salaryData.categories) as Category[];
}

export function getRolesByCategory(salaryData: SalaryData, category: Category): RoleName[] {
  return salaryData.categories[category] || [];
}

export function getSalary(
  salaryData: SalaryData, 
  role: RoleName, 
  country: CountryCode, 
  experienceLevel: ExperienceLevel
): number | null {
  const roleData = salaryData.roles[role];
  if (!roleData) return null;
  
  const countryData = roleData.countries[country];
  if (!countryData) return null;
  
  return countryData[experienceLevel] || null;
}

export function getSalaryByContinent(
  salaryData: SalaryData, 
  role: RoleName, 
  continent: Continent, 
  experienceLevel: ExperienceLevel
): number | null {
  const roleData = salaryData.roles[role];
  if (!roleData) return null;
  
  const countriesInContinent = Object.keys(roleData.countries).filter(
    country => COUNTRY_TO_CONTINENT[country as CountryCode] === continent
  ) as CountryCode[];
  
  if (countriesInContinent.length === 0) return null;
  
  const salaries = countriesInContinent
    .map(country => roleData.countries[country]?.[experienceLevel])
    .filter(salary => salary !== undefined) as number[];
  
  if (salaries.length === 0) return null;
  
  return Math.round(salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length);
}

export function mapCountryNameToCode(countryName: string, salaryData: SalaryData): CountryCode | null {
  const firstRoleKey = Object.keys(salaryData.roles)[0] as RoleName;
  const validCountryCodes = Object.keys(salaryData.roles[firstRoleKey].countries) as CountryCode[];
  if (validCountryCodes.includes(countryName as CountryCode)) {
    return countryName as CountryCode;
  }
  
  const mappedCountry = salaryData.countryMapping[countryName];
  if (mappedCountry && validCountryCodes.includes(mappedCountry as CountryCode)) {
    return mappedCountry as CountryCode;
  }
  
  const manualMapping: Record<string, CountryCode> = {
    "United States": "USA",
    "United States of America": "USA",
    "United Kingdom": "London",
    "UAE": "Dubai",
    "United Arab Emirates": "Dubai",
    "UK": "London",
    "Great Britain": "London",
    "England": "London",
    "Germany": "Germany",
    "Singapore": "Singapore",
    "China": "China",
    "Australia": "Australia",
    "Sweden": "Sweden",
    "Netherlands": "Netherlands",
    "Switzerland": "Switzerland",
    "Canada": "Canada",
  };
  
  const manualMapped = manualMapping[countryName];
  if (manualMapped && validCountryCodes.includes(manualMapped)) {
    return manualMapped;
  }
  
  return null;
}

export const simplifyStackName = (stackName: string): string => {
	const simplifications: Record<string, string> = {
		'Rust Developer': 'Rust',
		'Solidity Developer': 'Solidity',
		'Blockchain Developer': 'Blockchain',
		'AI Web3 Developer': 'AI Web3',
		'Decentralized Data Engineer': 'Data Engineer',
		'Decentralized Data Scientist': 'Data Scientist',
		'React Native Developer': 'React Native',
		'Full-stack Python': 'Python',
		'Full-stack TypeScript': 'TypeScript',
		'Backend Python': 'Python',
		'Backend TypeScript': 'TypeScript',
		'Frontend TypeScript': 'TypeScript',
		'Golang Developer': 'Go',
		'Java Developer': 'Java',
		'iOS Developer': 'iOS',
		'Data Analyst': 'Data Analysis',
		'Data Engineer': 'Data Engineering',
		'Data Scientist': 'Data Science',
		'Machine Learning': 'ML',
		'ML Ops': 'MLOps',
		'Cloud Specialist': 'Cloud',
		'Multi-cloud Specialist': 'Multi-cloud',
		'Infrastructure as Code': 'IaC',
		'Cloud Security': 'Cloud Security',
		'Web3 Developer': 'Web3',
		'Smart Contract Developer': 'Smart Contracts',
		'Engineering Manager': 'EM',
	};
	
	return simplifications[stackName] || stackName;
};
