export type ExperienceLevel = 'Junior' | 'Mid' | 'Senior' | 'Staff' | 'Principal';

export type CountryCode = 
  | 'Canada' 
  | 'Dubai' 
  | 'London' 
  | 'Germany' 
  | 'USA' 
  | 'Singapore' 
  | 'China' 
  | 'Australia' 
  | 'Sweden' 
  | 'Netherlands' 
  | 'Switzerland';

export type Category = 
  | 'Frontend' 
  | 'Backend' 
  | 'Full-stack' 
  | 'AI/ML' 
  | 'Data' 
  | 'Cloud' 
  | 'Security' 
  | 'DevOps' 
  | 'Web3' 
  | 'Mobile' 
  | 'Management';

export type RoleName = 
  | 'Frontend TypeScript'
  | 'Golang Developer'
  | 'Java Developer'
  | 'Rust Developer'
  | 'Backend TypeScript'
  | 'Backend Python'
  | 'Full-stack Python'
  | 'Full-stack TypeScript'
  | 'Data Analyst'
  | 'Data Engineer'
  | 'Data Scientist'
  | 'Machine Learning'
  | 'ML Ops'
  | 'Cloud Specialist'
  | 'Multi-cloud Specialist'
  | 'SRE'
  | 'Infrastructure as Code'
  | 'Cybersecurity Specialist'
  | 'Rust Developer'
  | 'Solidity Developer'
  | 'Blockchain Developer'
  | 'AI Web3 Developer'
  | 'Decentralized Data Engineer'
  | 'Decentralized Data Scientist'
  | 'iOS Developer'
  | 'React Native Developer'
  | 'Engineering Manager';

export interface CountrySalaryData {
  Junior: number;
  Mid: number;
  Senior: number;
  Staff: number;
  Principal: number;
}

export interface Role {
  category: Category;
  countries: {
    [key in CountryCode]: CountrySalaryData;
  };
}

export interface SalaryData {
  metadata: {
    version: string;
    currency: string;
    lastUpdated: string;
    experienceLevels: ExperienceLevel[];
  };
  roles: {
    [key in RoleName]: Role;
  };
  categories: {
    [key in Category]: RoleName[];
  };
  countryMapping: {
    [key: string]: CountryCode;
  };
}

export type Continent = 'Europe' | 'Asia' | 'North America' | 'Oceania';

export const COUNTRY_TO_CONTINENT: Record<CountryCode, Continent> = {
  'Canada': 'North America',
  'USA': 'North America',
  'Dubai': 'Asia',
  'Singapore': 'Asia',
  'China': 'Asia',
  'London': 'Europe',
  'Germany': 'Europe',
  'Sweden': 'Europe',
  'Netherlands': 'Europe',
  'Switzerland': 'Europe',
  'Australia': 'Oceania',
};

export interface ContinentSalaryData {
  Junior: number;
  Mid: number;
  Senior: number;
  Staff: number;
  Principal: number;
}

export interface SalaryByContinent {
  Europe?: ContinentSalaryData;
  Asia?: ContinentSalaryData;
  'North America'?: ContinentSalaryData;
  Oceania?: ContinentSalaryData;
}
