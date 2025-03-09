import { ReactElement } from "react";
import { MockTour, mockTours } from "@/mocks/mockTours";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import TourCard from "@/components/TourCard/TourCard";
import Image from "next/image";
import TourDetails from "@/app/tour/[id]/components/TourDetails/TourDetails";
import ReturnButton from "@/components/ReturnButton/ReturnButton";

type Props = {
  params: { id: string };
};

export default function page({ params }: Props): ReactElement {
  const tour = mockTours.find((x) => x.id === Number(params.id));

  if (!tour) {
    return notFound();
  }

  //TEMP
  const getRandomTours = (
    count: number,
    currentTourId: number,
    tours: MockTour[],
  ): MockTour[] => {
    const filteredTours = tours.filter((tour) => tour.id !== currentTourId);
    const indexes = new Set<number>();

    while (indexes.size < count && indexes.size < filteredTours.length) {
      const randomIndex = Math.floor(Math.random() * filteredTours.length);
      indexes.add(randomIndex);
    }

    return Array.from(indexes).map((index) => filteredTours[index]);
  };

  const randomTours = getRandomTours(3, Number(params.id), mockTours);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles["main-header"]}>
          <h2 className={styles.title}>{tour.title}</h2>
          <ReturnButton>بازگشت</ReturnButton>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.image}>
          <Image src={tour.image} alt={tour.title} width={600} height={400} />
        </div>
        <TourDetails tourId={Number(params.id)} />
      </main>
      <aside className={styles.recommended}>
        <h3 className={styles["recommended-header"]}>تورهای مشابه</h3>
        {randomTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </aside>
    </div>
  );
}
