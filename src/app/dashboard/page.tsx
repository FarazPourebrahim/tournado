"use client";

import { ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button/Button";
import { fetchWithToast } from "@/utils/fetch";
import styles from "./page.module.css";

export default function Page(): ReactElement {
  const router = useRouter();

  const signOutButtonClickHandler = async (): Promise<void> => {
    const result = await fetchWithToast<null>(
      "/api/auth/sign-out",
      {
        method: "POST",
      },
      "به امید دیدار!",
    );

    if (result.error) {
      return;
    }

    router.push("/");
  };

  return (
    <div className={styles.page}>
      <h1>داشبورد</h1>
      <Button variant="danger" onClick={signOutButtonClickHandler}>
        خروج
      </Button>
    </div>
  );
}
