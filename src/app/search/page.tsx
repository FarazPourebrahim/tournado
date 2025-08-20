"use client";

import { useTours } from "@/app/search/hooks/useTours";
import styles from "./page.module.css";

import FiltersProvider from "@/app/search/providers/filters/filters.provider";
import ResetButton from "@/app/search/components/ResetButton/ResetButton";
import TourTypeFilter from "@/app/search/components/TourTypeFilter/TourTypeFilter";
import PriceRangeFilter from "@/app/search/components/PriceRangeFilter/PriceRangeFilter";
import DurationFilter from "@/app/search/components/DurationFilter/DurationFilter";
import TourGuideFilter from "@/app/search/components/TourGuideFilter/TourGuideFilter";
import SearchBox from "@/components/SearchBox/SearchBox";
import Sort from "@/app/search/components/Sort/Sort";
import Card from "@/components/Card/Card";

type SearchParams = { [key: string]: string | string[] | undefined };

type Props = {
  searchParams: SearchParams;
};

function PageContent({ searchParams }: Props): React.ReactElement {
  const query =
    typeof searchParams.query === "string" ? searchParams.query : "";
  const { sortedMockTours, handleSortChange, sortOption } = useTours(query);

  return (
    <div className={styles.page}>
      <aside className={styles.filters}>
        <ResetButton />
        <TourTypeFilter />
        <PriceRangeFilter />
        <DurationFilter />
        <TourGuideFilter />
      </aside>
      <main className={styles.main}>
        <SearchBox />
        <div className={styles["result-header"]}>
          <Sort selectedOption={sortOption} onSortChange={handleSortChange} />
          <p className={styles.count}>{sortedMockTours.length} نتیجه پیدا شد</p>
        </div>
        <div className={styles.result}>
          {sortedMockTours.map((tour) => (
            <Card key={tour.id} tour={tour} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default function Page({ searchParams }: Props): React.ReactElement {
  return (
    <FiltersProvider>
      <PageContent searchParams={searchParams} />
    </FiltersProvider>
  );
}
