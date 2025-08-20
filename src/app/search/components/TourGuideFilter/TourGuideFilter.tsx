"use client";

import { useContext, useState } from "react";
import styles from "./TourGuideFilter.module.css";
import { FiltersContext } from "@/app/search/providers/filters/filters.provider";

export default function TourGuideFilter() {
  const { filters, changeFilter } = useContext(FiltersContext);

  const [isGuideAvailable, setIsGuideAvailable] = useState<boolean>(
    filters.isGuideMandatory,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "yes";
    setIsGuideAvailable(value);
    changeFilter("isGuideMandatory", value);
  };

  return (
    <div className={styles.filter}>
      <p className={styles.label}>همراه با راهنما</p>
      <div className={styles.radioGroup}>
        <div className={styles.radioItem}>
          <input
            type="radio"
            id="guide-yes"
            name="guide"
            value="yes"
            onChange={handleChange}
            checked={isGuideAvailable}
            className={styles.radio}
          />
          <label htmlFor="guide-yes" className={styles.radioLabel}>
            بله
          </label>
        </div>
        <div className={styles.radioItem}>
          <input
            type="radio"
            id="guide-no"
            name="guide"
            value="no"
            onChange={handleChange}
            checked={!isGuideAvailable}
            className={styles.radio}
          />
          <label htmlFor="guide-no" className={styles.radioLabel}>
            فرقی ندارد
          </label>
        </div>
      </div>
    </div>
  );
}
