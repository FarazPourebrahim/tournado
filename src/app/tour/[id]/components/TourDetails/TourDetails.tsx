"use client"

import type React from "react"
import { type ReactElement, useState } from "react"
import styles from "./TourDetails.module.css"
import Overview from "@/app/tour/[id]/components/Overview/Overview"
import Details from "@/app/tour/[id]/components/Details/Details"
import Review from "@/app/tour/[id]/components/Review/Review"

type Props = {
    tour: any
}

type Tab = {
    title: string
    renderContent: (tour: any) => React.JSX.Element
}

export default function TourDetails({ tour }: Props): ReactElement {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const tabs: Tab[] = [
        {
            title: "اطلاعات کلی",
            renderContent: (tour) => <Overview tour={tour} />,
        },
        { title: "جزئیات", renderContent: (tour) => <Details tour={tour} /> },
        { title: "نظرات", renderContent: (tour) => <Review tourId={tour.id} /> },
    ]

    return (
        <section className={styles.details}>
            <div className={styles.tabs}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`${styles.button} ${activeTabIndex === index ? styles.active : ""}`}
                        onClick={() => setActiveTabIndex(index)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
            <div className={styles.content}>{tabs[activeTabIndex].renderContent(tour)}</div>
        </section>
    )
}
