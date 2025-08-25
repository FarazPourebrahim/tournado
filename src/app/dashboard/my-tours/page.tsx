import { Suspense } from "react"
import MyToursContent from "./components/MyToursContent/MyToursContent"
import styles from "./page.module.css"

export default function MyToursPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>تور های من</h1>
                <p className={styles.subtitle}>مدیریت تور های ایجاد شده توسط شما</p>
            </div>

            <Suspense fallback={<div className={styles.loading}>در حال بارگذاری...</div>}>
                <MyToursContent />
            </Suspense>
        </div>
    )
}
