"use client";

import { ReactElement } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import styles from "./Header.module.css";
import { ButtonLink } from "@/components/Button/Button";

export default function Header(): ReactElement {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "خانه" },
    { href: "/search", label: "جستجو" },
    { href: "/dashboard/profile", label: "داشبورد کاربری" },
  ];

  return (
    <header className={styles.header}>
      <nav>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(pathname === link.href && styles.active)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ButtonLink
        href={"/auth/sign-up"}
        className={styles.cta}
        variant={"primary"}
        shape={"outlined"}
      >
        ورود | ثبت‌نام
      </ButtonLink>
    </header>
  );
}
