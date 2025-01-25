import { ReactElement } from "react";
import styles from "./Hero.module.css";
import Image from "next/image";

export default function Hero(): ReactElement {
  return (
    <div className={styles.hero}>
      <div className={styles["hero-image"]}>
        <div className={styles.circle}></div>
        <Image src={"/images/hero.png"} height={400} width={600} alt={""} />
      </div>
      <div className={styles.intro}>
        <h2 className={styles["hero-header"]}>
          ماجراجویی تو از<br></br> <span>تورنیدو</span> شروع می‌شود!
        </h2>
        <p>
          بهترین مقصدها برای <span>سفرهای رویایی</span> را کشف کن.
        </p>

        <p>
          سفرهایی پر از هیجان، شادی و خاطرات ماندگار<br></br> برای تو و عزیزانت.
        </p>
      </div>
    </div>
  );
}
