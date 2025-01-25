"use client";

import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useState,
  useMemo,
} from "react";
import { FiltersType } from "@/app/search/types/filters.type";
import { mockTours } from "@/mocks/mockTours";

type ContextValue = {
  filters: FiltersType;
  initialFilters: FiltersType;
  changeFilter: <TKey extends keyof FiltersType>(
    key: TKey,
    value: FiltersType[TKey],
  ) => void;
  removeFilter: <TKey extends keyof FiltersType>(key: TKey) => void;
  clearAll: () => void;
};

export const FiltersContext = createContext<ContextValue>({
  filters: {
    min: 0,
    max: 0,
    type: "All",
    isGuideMandatory: false,
    duration: [1, 30],
  },
  initialFilters: {
    min: 0,
    max: 0,
    type: "All",
    isGuideMandatory: false,
    duration: [1, 30],
  },
  changeFilter: () => {},
  removeFilter: () => {},
  clearAll: () => {},
});

type Props = PropsWithChildren;

export default function FiltersProvider({ children }: Props): ReactElement {
  const minPrice = Math.min(...mockTours.map((tour) => tour.price));
  const maxPrice = Math.max(...mockTours.map((tour) => tour.price));

  const initialFilters: FiltersType = useMemo(
    () => ({
      min: minPrice,
      max: maxPrice,
      type: "All",
      isGuideMandatory: false,
      duration: [1, 30],
    }),
    [minPrice, maxPrice],
  );

  const [filters, setFilters] = useState<FiltersType>(initialFilters);

  const changeFilter = <TKey extends keyof FiltersType>(
    key: TKey,
    value: FiltersType[TKey],
  ): void => {
    setFilters((old) => ({ ...old, [key]: value }));
  };

  const removeFilter = <TKey extends keyof FiltersType>(key: TKey): void => {
    setFilters((old) => {
      const clone = { ...old };
      delete clone[key];
      return clone;
    });
  };

  const clearAll = (): void => {
    setFilters(initialFilters);
  };

  return (
    <FiltersContext.Provider
      value={{ filters, initialFilters, changeFilter, removeFilter, clearAll }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
