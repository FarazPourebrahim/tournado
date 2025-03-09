import { ReactElement } from "react";
import styles from "./Recommended.module.css";
import { mockTours } from "@/mocks/mockTours";
import TourCard from "@/components/TourCard/TourCard";
import { ButtonLink } from "@/components/Button/Button";

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
        <ButtonLink href="/search">مشاهده تورها</ButtonLink>
      </div>
      <div className={styles["random-recommendations"]}>
        {randomTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
}
