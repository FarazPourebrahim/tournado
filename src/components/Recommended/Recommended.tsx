import { ReactElement } from "react";
import styles from "./Recommended.module.css";
import Link from "next/link";
import { mockTours } from "@/mocks/mockTours";
import Card from "@/components/Card/Card";
import clsx from "clsx";
import "@/styles/btn.css";

export default function Recommended(): ReactElement {
  const getRandomIndexes = (count: number, max: number): number[] => {
    const indexes = new Set<number>();
    while (indexes.size < count) {
      const randomIndex = Math.floor(Math.random() * max);
      indexes.add(randomIndex);
    }
    return Array.from(indexes);
  };

  const randomIndexes = getRandomIndexes(4, mockTours.length);
  const randomTours = randomIndexes.map((index) => mockTours[index]);

  return (
    <section className={styles.recommended}>
      <div className={styles.header}>
        <h3>یک ماجراجویی فراموش‌نشدنی در همین نزدیکی!</h3>
        <Link href="/search" className={clsx(styles.more, "btn")}>
          مشاهده تورها
        </Link>
      </div>
      <div className={styles["random-recommendations"]}>
        {randomTours.map((tour) => (
          <Card key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
}
