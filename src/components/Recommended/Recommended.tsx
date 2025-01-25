import { ReactElement } from "react";
import styles from "./Recommended.module.css";
import Link from "next/link";
import { mockTours } from "@/mocks/mockTours";
import Card from "@/components/Card/Card";

export default function Recommended(): ReactElement {
  const getRandomIndexes = (count: number, max: number): number[] => {
    const indexes = new Set<number>();
    while (indexes.size < count) {
      const randomIndex = Math.floor(Math.random() * max);
      indexes.add(randomIndex);
    }
    return Array.from(indexes);
  };

  const randomIndexes = getRandomIndexes(3, mockTours.length);
  const randomTours = randomIndexes.map((index) => mockTours[index]);

  return (
    <div className={styles.recommended}>
      <h3>یک ماجراجویی فراموش‌نشدنی در همین نزدیکی!</h3>
      <div className={styles["random-recommendations"]}>
        <Link href={"/search"} className={styles.more}>
          ▶
        </Link>
        {randomTours.map((tour) => (
          <Card key={tour.id} tour={tour} />
        ))}
        <Link href={"/search"} className={styles.more}>
          ◀
        </Link>
      </div>
    </div>
  );
}
