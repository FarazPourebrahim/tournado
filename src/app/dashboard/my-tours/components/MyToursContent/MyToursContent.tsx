"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { fetchWithToast } from "@/utils/fetch"
import TourCard from "@/components/TourCard/TourCard"
import { Button, ButtonLink } from "@/components/Button/Button"
import NormalInput from "@/components/NormalInput/NormalInput"
import type { Tour } from "@/types/tour.type"
import styles from "./MyToursContent.module.css"

interface MyToursResponse {
    tours: Tour[]
    pagination: {
        page: number
        limit: number
        totalCount: number
        totalPages: number
        hasNext: boolean
        hasPrev: boolean
    }
}

export default function MyToursContent() {
    const [tours, setTours] = useState<Tour[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [pagination, setPagination] = useState<MyToursResponse["pagination"] | null>(null)

    const fetchMyTours = async (page = 1, searchQuery = "") => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: "12",
            })

            if (searchQuery.trim()) {
                params.append("search", searchQuery.trim())
            }

            const response = await fetchWithToast<MyToursResponse>(`/my-tours?${params}`, {
                method: "GET",
            })

            if (response.data) {
                setTours(response.data.tours)
                setPagination(response.data.pagination)
            }
        } catch (error) {
            console.error("Error fetching my tours:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMyTours(currentPage, search)
    }, [currentPage])

    const handleSearch = () => {
        setCurrentPage(1)
        fetchMyTours(1, search)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    if (loading && tours.length === 0) {
        return <div className={styles.loading}>در حال بارگذاری تور های شما...</div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.searchSection}>
                <div className={styles.searchInput}>
                    <NormalInput
                        label={""}
                        type="text"
                        placeholder="جستجو در تور های من..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <Button variant="primary" onClick={handleSearch} disabled={loading}>
                    جستجو
                </Button>
            </div>

            {tours.length === 0 ? (
                <div className={styles.emptyState}>
                    <h3>هیچ توری یافت نشد</h3>
                    <p>شما هنوز هیچ توری ایجاد نکرده‌اید یا تور مورد نظر یافت نشد.</p>
                    <ButtonLink variant="primary" href="/dashboard/new-tour">
                        ایجاد تور جدید
                    </ButtonLink>
                </div>
            ) : (
                <>
                    <div className={styles.toursGrid}>
                        {tours.map((tour) => (
                            <TourCard key={tour.id} tour={tour} />
                        ))}
                    </div>

                    {pagination && pagination.totalPages > 1 && (
                        <div className={styles.pagination}>
                            <Button
                                variant="default"
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                disabled={!pagination.hasPrev || loading}
                            >
                                صفحه قبل
                            </Button>

                            <span className={styles.pageInfo}>
                صفحه {pagination.page} از {pagination.totalPages}
              </span>

                            <Button
                                variant="default"
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                disabled={!pagination.hasNext || loading}
                            >
                                صفحه بعد
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
