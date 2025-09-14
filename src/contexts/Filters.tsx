// contexts/filters.tsx
import { createContext, useContext, useMemo, useReducer } from "react";
import type { Category, RoleName } from "@/types/salaryTypes";

type ComparisonType = "stacks" | "areas";

type FiltersState = {
  selectedCategory: Category;
  selectedRole: RoleName | null;
  experience: number[];
  hasInternational: boolean;
  selectedCountry: string;
  comparisonType: ComparisonType;
  isMobileSidebarOpen: boolean;
};

type FiltersAction =
  | { type: "setCategory"; category: Category }
  | { type: "setRole"; role: RoleName | null }
  | { type: "setExperience"; experience: number[] }
  | { type: "setHasInternational"; value: boolean }
  | { type: "setSelectedCountry"; country: string }
  | { type: "toggleComparisonType" }
  | { type: "openSidebar" }
  | { type: "closeSidebar" };

const initialState: FiltersState = {
  selectedCategory: "Backend",
  selectedRole: null,
  experience: [3],
  hasInternational: false,
  selectedCountry: "United States",
  comparisonType: "stacks",
  isMobileSidebarOpen: false,
};

function reducer(state: FiltersState, action: FiltersAction): FiltersState {
  switch (action.type) {
    case "setCategory":
      return { ...state, selectedCategory: action.category, selectedRole: null };
    case "setRole":
      return { ...state, selectedRole: action.role };
    case "setExperience":
      return { ...state, experience: action.experience };
    case "setHasInternational":
      return { ...state, hasInternational: action.value };
    case "setSelectedCountry":
      return { ...state, selectedCountry: action.country };
    case "toggleComparisonType":
      return {
        ...state,
        comparisonType: state.comparisonType === "stacks" ? "areas" : "stacks",
      };
    case "openSidebar":
      return { ...state, isMobileSidebarOpen: true };
    case "closeSidebar":
      return { ...state, isMobileSidebarOpen: false };
    default:
      return state;
  }
}

type FiltersContextValue = {
  state: FiltersState;
  dispatch: React.Dispatch<FiltersAction>;
  setCategory: (c: Category) => void;
  setRole: (r: RoleName | null) => void;
  setExperience: (e: number[]) => void;
  setHasInternational: (v: boolean) => void;
  setSelectedCountry: (c: string) => void;
  toggleComparisonType: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

const FiltersContext = createContext<FiltersContextValue | null>(null);

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<FiltersContextValue>(() => ({
    state,
    dispatch,
    setCategory: (c) => dispatch({ type: "setCategory", category: c }),
    setRole: (r) => dispatch({ type: "setRole", role: r }),
    setExperience: (e) => dispatch({ type: "setExperience", experience: e }),
    setHasInternational: (v) =>
      dispatch({ type: "setHasInternational", value: v }),
    setSelectedCountry: (c) =>
      dispatch({ type: "setSelectedCountry", country: c }),
    toggleComparisonType: () => dispatch({ type: "toggleComparisonType" }),
    openSidebar: () => dispatch({ type: "openSidebar" }),
    closeSidebar: () => dispatch({ type: "closeSidebar" }),
  }), [state]);

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFilters must be used within FiltersProvider");
  return ctx;
}
