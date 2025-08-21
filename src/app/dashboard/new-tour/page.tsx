import type { ReactElement } from "react"
import type { Metadata } from "next"

import NewTourForm from "./components/NewTourForm/NewTourForm"

import styles from "./page.module.css"

export const metadata: Metadata = {
    title: "ایجاد تور جدید",
    description: "ایجاد تور جدید در سیستم",
}

export default function NewTourPage(): ReactElement {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>ایجاد تور جدید</h1>
                <p className={styles.description}>اطلاعات تور خود را وارد کنید تا تور جدید ایجاد شود</p>
            </div>

            <NewTourForm />
        </div>
    )
}
