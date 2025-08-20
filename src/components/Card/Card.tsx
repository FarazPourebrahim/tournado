import styles from "./Card.module.css";
import Image from "next/image";
import Link from "next/link";
import { MockTour } from "@/mocks/mockTours";

export default function Card({ tour }: { tour: MockTour }) {
  const { id, title, location, price, duration, guideAvailable, type, image } =
    tour;

  return (
    <Link href={`/tour/${id}`} className={styles.card}>
      <Image
        src={image}
        alt={title}
        className={styles.image}
        width={400}
        height={400}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.details}>
          <span>{location}</span>
          <span>/</span>
          <span>{duration} روز</span>
          <span>/</span>
          <span>{guideAvailable ? "با راهنما" : "بدون راهنما"}</span>
        </p>
        <div className={styles.bottom}>
          <p className={styles.price}>{price.toLocaleString()} تومان</p>
          <p className={styles.type}>{type.label}</p>
        </div>
      </div>
    </Link>
  );
}
