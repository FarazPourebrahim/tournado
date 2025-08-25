import type { ReactElement } from "react"
import { notFound } from "next/navigation"
import styles from "./page.module.css"
import TourCard from "@/components/TourCard/TourCard"
import Image from "next/image"
import TourDetails from "@/app/tour/[id]/components/TourDetails/TourDetails"
import ReturnButton from "@/components/ReturnButton/ReturnButton"

type Props = {
  params: { id: string }
}

async function getTour(id: string) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/tours/${id}`
    console.log("[v0] Fetching tour from:", apiUrl)

    const response = await fetch(apiUrl, {
      cache: "no-store",
    })

    console.log("[v0] Tour API response status:", response.status)

    if (!response.ok) {
      console.log("[v0] Tour API response not ok:", response.statusText)
      return null
    }

    const data = await response.json()
    console.log("[v0] Tour data received:", data)
    return data.data
  } catch (error) {
    console.error("[v0] Error fetching tour:", error)
    return null
  }
}

async function getRecommendedTours(currentTourId: string) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/tours?limit=3`
    console.log("[v0] Fetching recommended tours from:", apiUrl)

    const response = await fetch(apiUrl, {
      cache: "no-store",
    })

    console.log("[v0] Recommended tours API response status:", response.status)

    if (!response.ok) {
      console.log("[v0] Recommended tours API response not ok:", response.statusText)
      return []
    }

    const data = await response.json()
    console.log("[v0] Recommended tours data received:", data)
    const tours = data.data?.tours || []
    return tours.filter((tour: any) => tour.id !== currentTourId)
  } catch (error) {
    console.error("[v0] Error fetching recommended tours:", error)
    return []
  }
}

export default async function page({ params }: Props): Promise<ReactElement> {
  const tour = await getTour(params.id)

  if (!tour) {
    return notFound()
  }

  const recommendedTours = await getRecommendedTours(params.id)

  return (
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles["main-header"]}>
            <h2 className={styles.title}>{tour.title}</h2>
            <ReturnButton>بازگشت</ReturnButton>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.image}>
            <Image src={tour.image || "/placeholder.svg"} alt={tour.title} width={600} height={400} />
          </div>
          <TourDetails tour={tour} />
        </main>
        <aside className={styles.recommended}>
          <h3 className={styles["recommended-header"]}>تورهای مشابه</h3>
          {recommendedTours.map((tour: any) => (
              <TourCard key={tour.id} tour={tour} />
          ))}
        </aside>
      </div>
  )
}
