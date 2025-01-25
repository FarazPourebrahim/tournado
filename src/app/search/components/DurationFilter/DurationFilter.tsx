"use client";

import { useContext, useState } from "react";
import styles from "./DurationFilter.module.css";
import { FiltersContext } from "@/app/search/providers/filters/filters.provider";
import { FiltersType } from "@/app/search/types/filters.type";

export default function DurationFilter() {
  const options: { label: string; value: [number, number] }[] = [
    { label: "هر مدتی", value: [1, 30] },
    { label: "1 تا 3 روز", value: [1, 3] },
    { label: "4 تا 7 روز", value: [4, 7] },
    { label: "8 تا 14 روز", value: [8, 14] },
    { label: "15 تا 30 روز", value: [15, 30] },
  ];

  const { filters, changeFilter } = useContext(FiltersContext);
  const [selectedOption, setSelectedOption] = useState<[number, number]>(
    filters.duration || options[0].value,
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = options[Number(event.target.value)]
      .value as FiltersType["duration"];
    setSelectedOption(selectedValue);
    changeFilter("duration", selectedValue);
  };

  return (
    <div className={styles.filter}>
      <label htmlFor="durationFilter" className={styles.label}>
        مدت زمان
      </label>
      <select
        id="durationFilter"
        className={styles.dropdown}
        onChange={handleChange}
        value={options.findIndex(
          (option) =>
            option.value[0] === selectedOption[0] &&
            option.value[1] === selectedOption[1],
        )}
      >
        {options.map((option, index) => (
          <option key={index} value={index}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
