"use client";

import type { ReactElement } from "react";
import styles from "./Details.module.css";
import { mockTours } from "@/mocks/mockTours";

type Props = {
  tourId: number | undefined;
};

export default function Details({ tourId }: Props): ReactElement {
  const tour = mockTours.find((tour) => tour.id === tourId);

  if (!tour) {
    return (
      <div className={styles.details}>جزئیات بیشتر در دسترس نمی باشد.</div>
    );
  }

  return (
    <div className={styles.details}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>توضیحات</h3>
        <p className={styles.description}>{tour.description}</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>نکات برجسته</h3>
        <ul className={styles.list}>
          {tour.highlights.map((highlight, index) => (
            <li key={index} className={styles.listItem}>
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>برنامه سفر</h3>
        {tour.itinerary.map((day) => (
          <div key={day.day} className={styles.dayPlan}>
            <h4 className={styles.dayTitle}>
              روز {day.day}: {day.title}
            </h4>
            <ul className={styles.activities}>
              {day.activities.map((activity, index) => (
                <li key={index} className={styles.activity}>
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.twoColumns}>
        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>شامل می‌شود</h3>
          <ul className={styles.list}>
            {tour.included.map((item, index) => (
              <li key={index} className={styles.listItem}>
                ✓ {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>شامل نمی‌شود</h3>
          <ul className={styles.list}>
            {tour.excluded.map((item, index) => (
              <li key={index} className={styles.listItem}>
                ✗ {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>الزامات و نکات مهم</h3>
        <ul className={styles.list}>
          {tour.requirements.map((requirement, index) => (
            <li key={index} className={styles.listItem}>
              {requirement}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>ظرفیت:</span>
          <span className={styles.infoValue}>{tour.maxCapacity} نفر</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>سطح سختی:</span>
          <span className={styles.infoValue}>{tour.difficulty}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>بهترین زمان:</span>
          <span className={styles.infoValue}>{tour.bestTime}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>حمل و نقل:</span>
          <span className={styles.infoValue}>{tour.transportation}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>اقامت:</span>
          <span className={styles.infoValue}>{tour.accommodation}</span>
        </div>
      </div>
    </div>
  );
}
