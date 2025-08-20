"use client"

import { useContext, useMemo, useState, useEffect } from "react"
import { FiltersContext } from "@/app/search/providers/filters/filters.provider"
import type { Tour } from "@/types/tour.type"

export function useTours(query: string) {
  const { filters } = useContext(FiltersContext)
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState({
    label: "قیمت (کم به زیاد)",
    value: "price-asc",
  })

  const handleSortChange = (option: { value: string; label: string }) => {
    setSortOption(option)
  }

  const fetchTours = async () => {
    setLoading(true)
    setError(null)

    try {
      const searchParams = new URLSearchParams()

      if (query) searchParams.append("search", query)
      if (filters.type !== "All" && Array.isArray(filters.type)) {
        filters.type.forEach((type) => searchParams.append("type", type))
      }
      if (filters.min) searchParams.append("minPrice", filters.min.toString())
      if (filters.max) searchParams.append("maxPrice", filters.max.toString())
      if (filters.duration) {
        searchParams.append("minDuration", filters.duration[0].toString())
        searchParams.append("maxDuration", filters.duration[1].toString())
      }
      if (filters.isGuideMandatory) {
        searchParams.append("guideAvailable", "true")
      }

      const response = await fetch(`/api/tours?${searchParams.toString()}`)

      if (!response.ok) {
        throw new Error("خطا در دریافت تورها")
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setTours(data.data.tours)
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطای غیرمنتظره")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTours()
  }, [filters, query])

  const sortedTours = useMemo(() => {
    return [...tours].sort((a, b) => {
      switch (sortOption.value) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "duration-asc":
          return a.duration - b.duration
        case "duration-desc":
          return b.duration - a.duration
        default:
          return 0
      }
    })
  }, [tours, sortOption])

  return {
    sortedMockTours: sortedTours,
    handleSortChange,
    sortOption,
    loading,
    error,
  }
}
