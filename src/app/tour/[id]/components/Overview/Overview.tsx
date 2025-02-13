import React, { ReactElement } from "react";
import styles from "./Overview.module.css";
import { mockTours } from "@/mocks/mockTours";

type Props = {
  tourId: number | undefined;
};

export default function Overview({ tourId }: Props): ReactElement {
  const tour = mockTours.find((tour) => tour.id === tourId);

  return (
    <div className={styles.overview}>
      <h2 className={styles.title}>{tour?.title}</h2>
      <p className={styles.detail}>
        <span className={styles.label}>موقعیت: </span>
        {tour?.location}
      </p>
      <p className={styles.detail}>
        <span className={styles.label}>قیمت: </span>
        {tour?.price.toLocaleString("fa-IR")} تومان
      </p>
      <p className={styles.detail}>
        <span className={styles.label}>مدت زمان: </span>
        {tour?.duration} روز
      </p>
      <p className={styles.detail}>
        <span className={styles.label}>راهنما موجود: </span>
        {tour?.guideAvailable ? "بله" : "خیر"}
      </p>
      <p className={styles.detail}>
        <span className={styles.label}>نوع: </span>
        {tour?.type.label}
      </p>
    </div>
  );
}
