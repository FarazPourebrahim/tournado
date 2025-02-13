"use client";

import { useContext, useState } from "react";
import styles from "./DurationFilter.module.css";
import { FiltersContext } from "@/app/search/providers/filters/filters.provider";
import { FiltersType } from "@/app/search/types/filters.type";
import Select from "@/components/Select/Select";
import { durationOption } from "@/app/search/types/option.type";

export default function DurationFilter() {
  const options: durationOption[] = [
    { label: "هر مدتی", value: [1, 30] },
    { label: "1 تا 3 روز", value: [1, 3] },
    { label: "4 تا 7 روز", value: [4, 7] },
    { label: "8 تا 14 روز", value: [8, 14] },
    { label: "15 تا 30 روز", value: [15, 30] },
  ];

  const { filters, changeFilter } = useContext(FiltersContext);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (option: durationOption) => {
    const selectedValue = option.value as FiltersType["duration"];
    setSelectedOption(option);
    changeFilter("duration", selectedValue);
  };

  return (
    <div className={styles.filter}>
      <label htmlFor="durationFilter" className={styles.label}>
        مدت زمان
      </label>

      <Select
        options={options}
        onSelectedOptionChange={handleChange}
        selectedOption={selectedOption}
      />
    </div>
  );
}
