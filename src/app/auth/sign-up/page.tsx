import { ReactElement } from "react";

import SignUpForm from "@/app/auth/components/SignUpForm/SignUpForm";

import styles from "./page.module.css";

export default function Page(): ReactElement {
  return (
    <div className={styles.page}>
      <SignUpForm />
    </div>
  );
}
