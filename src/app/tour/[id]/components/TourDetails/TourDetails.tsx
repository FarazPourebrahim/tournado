"use client";

import type React from "react";
import { type ReactElement, useState } from "react";
import styles from "./TourDetails.module.css";
import Overview from "@/app/tour/[id]/components/Overview/Overview";
import Details from "@/app/tour/[id]/components/Details/Details";
import Review from "@/app/tour/[id]/components/Review/Review";

type Props = {
  tourId: number;
};

type Tab = {
  title: string;
  renderContent: (tourId: number | undefined) => React.JSX.Element;
};

export default function TourDetails({ tourId }: Props): ReactElement {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs: Tab[] = [
    {
      title: "اطلاعات کلی",
      renderContent: (tourId) => <Overview tourId={tourId} />,
    },
    { title: "جزئیات", renderContent: (tourId) => <Details tourId={tourId} /> },
    { title: "نظرات", renderContent: (tourId) => <Review tourId={tourId} /> },
  ];

  return (
    <section className={styles.details}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.button} ${activeTabIndex === index ? styles.active : ""}`}
            onClick={() => setActiveTabIndex(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className={styles.content}>
        {tabs[activeTabIndex].renderContent(tourId)}
      </div>
    </section>
  );
}
