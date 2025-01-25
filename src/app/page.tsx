import { ReactElement } from "react";

import Hero from "@/components/Hero/Hero";
import Recommended from "@/components/Recommended/Recommended";

import styles from "./page.module.css";
import AdditionalInfo from "@/components/AdditionalInfo/AdditionalInfo";

export default function Home(): ReactElement {
  return (
    <div className={styles.home}>
      <Hero />
      <Recommended />
      <AdditionalInfo />
    </div>
  );
}
