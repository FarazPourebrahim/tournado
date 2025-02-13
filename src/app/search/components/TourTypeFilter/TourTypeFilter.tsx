"use client";

import { useContext } from "react";
import { FiltersContext } from "@/app/search/providers/filters/filters.provider";
import styles from "./TourTypeFilter.module.css";
import { TourType } from "@/mocks/mockTours";

export default function TourTypeFilter() {
  const tourTypes: TourType[] = [
    { value: "Cultural", label: "فرهنگی" },
    { value: "Adventure", label: "ماجراجویی" },
    { value: "Luxury", label: "لوکس" },
    { value: "Family", label: "خانوادگی" },
    { value: "Nature", label: "طبیعت‌گردی" },
    { value: "Historical", label: "تاریخی" },
    { value: "Sports", label: "ورزشی" },
    { value: "Relaxation", label: "آرامش" },
  ];

  const { filters, changeFilter } = useContext(FiltersContext);

  const selectedTypes: string[] =
    filters.type === "All" || !filters.type ? [] : (filters.type as string[]);

  const handleCheckboxChange = (value: string) => {
    if (selectedTypes.includes(value)) {
      const updatedTypes = selectedTypes.filter((type) => type !== value);
      // @ts-ignore
      changeFilter("type", updatedTypes.length > 0 ? updatedTypes : "All");
    } else {
      const updatedTypes = [...selectedTypes, value];
      // @ts-ignore
      changeFilter("type", updatedTypes);
    }
  };

  const isChecked = (value: string) => selectedTypes.includes(value);

  return (
    <div className={styles.filter}>
      <p className={styles.label}>نوع تور</p>
      <div className={styles.checkboxGroup}>
        {tourTypes.map((type) => (
          <div key={type.value} className={styles.checkboxItem}>
            <input
              type="checkbox"
              id={type.value}
              value={type.value}
              checked={isChecked(type.value)}
              onChange={() => handleCheckboxChange(type.value)}
              className={styles.checkbox}
            />
            <label htmlFor={type.value} className={styles.checkboxLabel}>
              {type.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
