"use client";

import { useContext, useMemo } from "react";
import styles from "./ResetButton.module.css";
import { FiltersContext } from "@/app/search/providers/filters/filters.provider";

export default function ResetButton() {
  const { filters, initialFilters, clearAll } = useContext(FiltersContext);

  const hasFiltersChanged = useMemo(() => {
    return JSON.stringify(filters) !== JSON.stringify(initialFilters);
  }, [filters, initialFilters]);

  return (
    <button
      className={`${styles.resetButton} ${!hasFiltersChanged ? styles.disabled : ""}`}
      onClick={clearAll}
      disabled={!hasFiltersChanged}
    >
      بازنشانی فیلترها
    </button>
  );
}
