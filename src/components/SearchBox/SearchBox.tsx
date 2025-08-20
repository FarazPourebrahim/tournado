"use client";

import { ReactElement, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import MingcuteSearchLine from "@/icons/MingcuteSearchLine";
import MingcuteLocationLine from "@/icons/MingcuteLocationLine";

import styles from "./SearchBox.module.css";

export default function SearchBox(): ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams as any);
    if (searchQuery.trim()) {
      params.set("query", searchQuery);
    } else {
      params.delete("query");
    }

    const newUrl = `/search?${params.toString()}`;
    if (window.location.pathname !== "/search") {
      router.push(newUrl);
    } else {
      router.push(`?${params.toString()}`);
    }
  };

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  return (
    <form className={styles["global-search-box"]} onSubmit={handleSubmit}>
      <div className={styles.prefix}>
        <MingcuteSearchLine />
      </div>
      <input
        type="text"
        placeholder="نام شهر، استان و ..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className={styles.divider}></div>
      <div className={styles.suffix}>
        <button type="button">
          <MingcuteLocationLine />
          همه شهرها
        </button>
      </div>
    </form>
  );
}
