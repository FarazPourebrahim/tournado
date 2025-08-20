"use client";

import { useContext, useState, useEffect } from "react";
import styles from "./PriceRangeFilter.module.css";
import { FiltersContext } from "@/app/search/providers/filters/filters.provider";
import { FiltersType } from "@/app/search/types/filters.type";

export default function PriceRangeFilter() {
  const { filters, initialFilters, changeFilter } = useContext(FiltersContext);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  const formatNumber = (number: number): string => {
    return new Intl.NumberFormat("fa-IR").format(number);
  };

  useEffect(() => {
    const initialMin = filters.min ?? 0;
    const initialMax = filters.max ?? initialFilters.max;
    setPriceRange([initialMin, initialMax]);
  }, [filters.min, filters.max, initialFilters.max]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newRange =
      name === "min"
        ? [Number(value), priceRange[1]]
        : [priceRange[0], Number(value)];

    // @ts-ignore
    setPriceRange(newRange);
    changeFilter(name as keyof FiltersType, Number(value));
  };

  return (
    <div className={styles.filter}>
      <p className={styles.label}>محدوده قیمت</p>
      <div className={styles.rangeSections}>
        <div className={styles.rangeSection}>
          <div className={styles.inputRow}>
            <label htmlFor="min" className={styles.inputLabel}>
              حداقل
            </label>
            <input
              type="number"
              id="min"
              name="min"
              step="200000"
              min="0"
              max={initialFilters.max}
              value={priceRange[0]}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <input
            type="range"
            min="0"
            max={initialFilters.max}
            step="500000"
            value={priceRange[0]}
            onChange={(e) =>
              handleChange({
                target: { name: "min", value: e.target.value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            className={styles.slider}
          />
        </div>

        <div className={styles.rangeSection}>
          <div className={styles.inputRow}>
            <label htmlFor="max" className={styles.inputLabel}>
              حداکثر
            </label>
            <input
              type="number"
              id="max"
              name="max"
              step="200000"
              min={priceRange[0]}
              max={initialFilters.max}
              value={priceRange[1]}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <input
            type="range"
            min={priceRange[0]}
            max={initialFilters.max}
            step="500000"
            value={priceRange[1]}
            onChange={(e) =>
              handleChange({
                target: { name: "max", value: e.target.value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            className={styles.slider}
          />
        </div>
      </div>
      <p className={styles.selectedRange}>
        از {formatNumber(priceRange[0])} تا {formatNumber(priceRange[1])} تومان
      </p>
    </div>
  );
}
