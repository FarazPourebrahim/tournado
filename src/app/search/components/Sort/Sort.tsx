"use client";

import styles from "./Sort.module.css";

type SortProps = {
  selectedOption: string;
  onSortChange: (value: string) => void;
};

export default function Sort({ selectedOption, onSortChange }: SortProps) {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  return (
    <div className={styles.sort}>
      <label htmlFor="sort" className={styles.label}>
        مرتب‌ سازی بر اساس:
      </label>
      <select
        id="sort"
        value={selectedOption}
        onChange={handleSortChange}
        className={styles.dropdown}
      >
        <option value="price-asc">قیمت (کم به زیاد)</option>
        <option value="price-desc">قیمت (زیاد به کم)</option>
        <option value="duration-asc">مدت زمان (کم به زیاد)</option>
        <option value="duration-desc">مدت زمان (زیاد به کم)</option>
        <option value="popularity">محبوبیت</option>
        <option value="rating">امتیاز</option>
      </select>
    </div>
  );
}
