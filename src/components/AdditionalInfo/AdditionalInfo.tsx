import { ReactElement } from "react";
import styles from "./AdditionalInfo.module.css";
import Image from "next/image";

export default function AdditionalInfo(): ReactElement {
  return (
    <div className={styles["additional-info"]}>
      <div className={styles.info}>
        <p>
          ما همه چیز را برای شما ساده کرده‌ایم! از برنامه‌ریزی سفر تا رزرو
          تورها، همه مراحل بدون <span className={styles.danger}>استرس</span> و
          کاملاً <span className={styles.success}>راحت</span> انجام می‌شوند.
        </p>
        <p>
          با ما، تنها چیزی که به آن فکر می‌کنید،{" "}
          <span className={styles.primary}>لذت</span> بردن از سفرهای خاطره‌ساز
          است!
        </p>
      </div>
      <div className={styles.image}>
        <div className={styles.circle}></div>
        <div className={styles["small-circle"]}></div>
        <Image
          src={"/images/additional-info.png"}
          alt={""}
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
