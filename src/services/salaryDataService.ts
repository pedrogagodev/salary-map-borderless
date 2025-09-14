import type { SalaryData } from '../types/salaryTypes';
import salaryDataJson from '../data/completeSeniorSalaryData.json';

let salaryDataCache: SalaryData | null = null;


export function loadSalaryData(): SalaryData {
  if (salaryDataCache) {
    return salaryDataCache;
  }
  
  salaryDataCache = salaryDataJson as SalaryData;
  return salaryDataCache;
}


export function getSalaryData(): SalaryData {
  return loadSalaryData();
}


export function reloadSalaryData(): SalaryData {
  salaryDataCache = null;
  return loadSalaryData();
}

export function isDataLoaded(): boolean {
  return salaryDataCache !== null;
}
