import styles from "./TourCard.module.css"
import Image from "next/image"
import Link from "next/link"
import type { Tour } from "@/types/tour.type"

export default function TourCard({ tour }: { tour: Tour }) {
    const { id, title, location, price, duration, guideAvailable, typeLabel, image } = tour

    return (
        <Link href={`/tour/${id}`} className={styles.card}>
            <Image src={image || "/placeholder.svg"} alt={title} className={styles.image} width={400} height={400} />
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.details}>
                    <span>{location}</span>
                    <span>/</span>
                    <span>{duration} روز</span>
                    <span>/</span>
                    <span>{guideAvailable ? "با راهنما" : "بدون راهنما"}</span>
                </p>
                <div className={styles.bottom}>
                    <p className={styles.price}>{price.toLocaleString()} تومان</p>
                    <p className={styles.type}>{typeLabel}</p>
                </div>
            </div>
        </Link>
    )
}
