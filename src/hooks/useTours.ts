"use client"

import { useState, useEffect } from "react"
import type { Tour } from "@/types/tour.type"

interface UseTours {
    tours: Tour[]
    loading: boolean
    error: string | null
    totalPages: number
    currentPage: number
    fetchTours: (filters?: any) => Promise<void>
}

export function useTours(): UseTours {
    const [tours, setTours] = useState<Tour[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchTours = async (filters: any = {}) => {
        setLoading(true)
        setError(null)

        try {
            const searchParams = new URLSearchParams()

            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    if (Array.isArray(value)) {
                        value.forEach((v) => searchParams.append(key, v.toString()))
                    } else {
                        searchParams.append(key, value.toString())
                    }
                }
            })

            const response = await fetch(`/api/tours?${searchParams.toString()}`)

            if (!response.ok) {
                throw new Error("خطا در دریافت تورها")
            }

            const data = await response.json()

            if (data.error) {
                throw new Error(data.error)
            }

            setTours(data.data.tours)
            setTotalPages(data.data.pagination.totalPages)
            setCurrentPage(data.data.pagination.page)
        } catch (err) {
            setError(err instanceof Error ? err.message : "خطای غیرمنتظره")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTours()
    }, [])

    return {
        tours,
        loading,
        error,
        totalPages,
        currentPage,
        fetchTours,
    }
}
