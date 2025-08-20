import { ReactElement } from "react";
import styles from "./AdditionalInfo.module.css";
import Image from "next/image";

export default function AdditionalInfo(): ReactElement {
  return (
    <section className={styles["additional-info"]}>
      <div className={styles.info}>
        <h4>
          لذت سفر با <span>تورنیدو</span>
        </h4>
        <p>
          ما همه چیز را برای شما ساده کرده‌ایم! از برنامه‌ریزی سفر تا رزرو
          تورها، همه مراحل بدون استرس و انجام می‌شوند. با ما، تنها چیزی که به آن
          فکر می‌کنید، لذت بردن از سفرهای خاطره‌ساز است!
        </p>
      </div>
      <div className={styles.image}>
        <div className={styles.circle}></div>
        <div className={styles["small-circle"]}></div>
        <Image
          src="/images/additional-info.png"
          alt=""
          width={500}
          height={500}
        />
      </div>
    </section>
  );
}
