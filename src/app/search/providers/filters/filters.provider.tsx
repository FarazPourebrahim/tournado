"use client"

import { createContext, type PropsWithChildren, type ReactElement, useState, useMemo, useEffect } from "react"
import type { FiltersType } from "@/app/search/types/filters.type"

type ContextValue = {
  filters: FiltersType
  initialFilters: FiltersType
  changeFilter: <TKey extends keyof FiltersType>(key: TKey, value: FiltersType[TKey]) => void
  removeFilter: <TKey extends keyof FiltersType>(key: TKey) => void
  clearAll: () => void
}

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
})

type Props = PropsWithChildren

export default function FiltersProvider({ children }: Props): ReactElement {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000000 })

  useEffect(() => {
    const fetchPriceRange = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tours?limit=1000")
        const data = await response.json()

        if (data.data?.tours) {
          const prices = data.data.tours.map((tour: any) => tour.price)
          const minPrice = Math.min(...prices)
          const maxPrice = Math.max(...prices)
          setPriceRange({ min: minPrice, max: maxPrice })
        }
      } catch (error) {
        console.error("Error fetching price range:", error)
      }
    }

    fetchPriceRange()
  }, [])

  const initialFilters: FiltersType = useMemo(
      () => ({
        min: priceRange.min,
        max: priceRange.max,
        type: "All",
        isGuideMandatory: false,
        duration: [1, 30],
      }),
      [priceRange.min, priceRange.max],
  )

  const [filters, setFilters] = useState<FiltersType>(initialFilters)

  // Update filters when price range changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      min: priceRange.min,
      max: priceRange.max,
    }))
  }, [priceRange])

  const changeFilter = <TKey extends keyof FiltersType>(key: TKey, value: FiltersType[TKey]): void => {
    setFilters((old) => ({ ...old, [key]: value }))
  }

  const removeFilter = <TKey extends keyof FiltersType>(key: TKey): void => {
    setFilters((old) => {
      const clone = { ...old }
      delete clone[key]
      return clone
    })
  }

  const clearAll = (): void => {
    setFilters(initialFilters)
  }

  return (
      <FiltersContext.Provider value={{ filters, initialFilters, changeFilter, removeFilter, clearAll }}>
        {children}
      </FiltersContext.Provider>
  )
}
