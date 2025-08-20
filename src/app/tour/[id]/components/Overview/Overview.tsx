import type { ReactElement } from "react"
import styles from "./Overview.module.css"
import { mockTours } from "@/mocks/mockTours"

type Props = {
    tourId: number | undefined
}

export default function Overview({ tourId }: Props): ReactElement {
    const tour = mockTours.find((tour) => tour.id === tourId)

    if (!tour) return <div>تور یافت نشد</div>

    return (
        <div className={styles.overview}>
            <div className={styles.mainInfo}>
                <h2 className={styles.title}>{tour.title}</h2>
                <p className={styles.description}>{tour.description}</p>

                <div className={styles.highlights}>
                    <h3 className={styles.sectionTitle}>نکات برجسته</h3>
                    <ul className={styles.highlightsList}>
                        {tour.highlights?.map((highlight, index) => (
                            <li key={index} className={styles.highlightItem}>
                                {highlight}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.tourInfo}>
                <h3 className={styles.sectionTitle}>اطلاعات تور</h3>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>موقعیت:</span>
                        <span className={styles.value}>{tour.location}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>قیمت:</span>
                        <span className={styles.value}>{tour.price.toLocaleString("fa-IR")} تومان</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>مدت زمان:</span>
                        <span className={styles.value}>{tour.duration} روز</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>راهنما:</span>
                        <span className={styles.value}>{tour.guideAvailable ? "موجود" : "غیر موجود"}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>نوع تور:</span>
                        <span className={styles.value}>{tour.type.label}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>ظرفیت:</span>
                        <span className={styles.value}>{tour.maxCapacity} نفر</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>سطح سختی:</span>
                        <span className={styles.value}>{tour.difficulty}</span>
                    </div>

                </div>
            </div>
        </div>
    )
}
