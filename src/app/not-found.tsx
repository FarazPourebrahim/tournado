import { ReactElement, Suspense } from "react";
import Image from "next/image";
import notFoundImage from "@/assets/vectors/not-found.svg";
import SearchBox from "@/components/SearchBox/SearchBox";
import styles from "./not-found.module.css";

export default function NotFound(): ReactElement {
  return (
    <div className={styles["not-found"]}>
      <div className={styles.writings}>
        <div className={styles["status-code"]}>404</div>
        <h1>صفحه‌ی مورد نظر پیدا نشد!</h1>
        <p>
          با عرض پوزش، لطفاً از طریق کادر جستجو، شهر یا تور مورد نظر خود را
          جستجو کنید.
        </p>
      </div>
      <div className={styles.visuals}>
        <Image src={notFoundImage} alt="" />
      </div>
      <div className={styles.search}>
        <Suspense fallback={<div>در حال بارگذاری، لطفا منتظر بمانید.</div>}>
          <SearchBox />
        </Suspense>
      </div>
    </div>
  );
}
