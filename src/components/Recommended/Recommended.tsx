"use client"

import { type ReactElement, useEffect, useState } from "react"
import styles from "./Recommended.module.css"
import TourCard from "@/components/TourCard/TourCard"
import { ButtonLink } from "@/components/Button/Button"
import type { Tour } from "@/types/tour.type"

export default function Recommended(): ReactElement {
    const [randomTours, setRandomTours] = useState<Tour[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRandomTours = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/tours?limit=20")
                const data = await response.json()

                if (data.data?.tours) {
                    // Get 4 random tours
                    const shuffled = [...data.data.tours].sort(() => 0.5 - Math.random())
                    setRandomTours(shuffled.slice(0, 4))
                }
            } catch (error) {
                console.error("Error fetching tours:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchRandomTours()
    }, [])

    if (loading) {
        return (
            <section className={styles.recommended}>
                <div className={styles.header}>
                    <h3>در حال بارگذاری...</h3>
                </div>
            </section>
        )
    }

    return (
        <section className={styles.recommended}>
            <div className={styles.header}>
                <h3>یک ماجراجویی فراموش‌نشدنی در همین نزدیکی!</h3>
                <ButtonLink href="/search">مشاهده تورها</ButtonLink>
            </div>
            <div className={styles["random-recommendations"]}>
                {randomTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                ))}
            </div>
        </section>
    )
}
