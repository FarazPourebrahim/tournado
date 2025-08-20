"use client";

import styles from "./Sort.module.css";
import Select from "@/components/Select/Select";
import { Option } from "@/app/search/types/option.type";

type SortProps = {
  selectedOption: Option;
  onSortChange: (value: Option) => void;
};

export default function Sort({ selectedOption, onSortChange }: SortProps) {
  const handleSortChange = (option: Option) => {
    onSortChange(option);
  };

  const options: Option[] = [
    {
      label: "قیمت (کم به زیاد)",
      value: "price-asc",
    },
    {
      label: "قیمت (زیاد به کم)",
      value: "price-desc",
    },
    {
      label: "مدت زمان (کم به زیاد)",
      value: "duration-asc",
    },
    {
      label: "مدت زمان (زیاد به کم)",
      value: "duration-desc",
    },
  ];

  return (
    <div className={styles.sort}>
      <label htmlFor="sort" className={styles.label}>
        مرتب‌ سازی بر اساس:
      </label>
      <Select
        options={options}
        onSelectedOptionChange={handleSortChange}
        selectedOption={selectedOption}
      />
    </div>
  );
}
