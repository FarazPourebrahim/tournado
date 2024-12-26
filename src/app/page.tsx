import { ReactElement } from "react";

import SearchBox from "@/components/SearchBox/SearchBox";

import styles from "./page.module.css";

export default function Home(): ReactElement {
  return (
    <div className={styles.home}>
      <h1>تورنیدو</h1>
      <SearchBox />
      <div className={styles.history}>
        <div className={styles.title}>آخرین جستجوهای شما</div>
        <ul>
          <li>رامسر</li>
          <li>مازندران</li>
        </ul>
      </div>
    </div>
  );
}
