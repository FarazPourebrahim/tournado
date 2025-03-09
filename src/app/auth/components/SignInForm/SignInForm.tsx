"use client";

import { FormEvent, ReactElement } from "react";

import Image from "next/image";
import Link from "next/link";

import signInImage from "@/assets/images/sign-in.webp";

import { Button } from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import NormalInputComponent from "@/components/NormalInput/NormalInput";
import PasswordInputComponent from "@/components/PasswordInput/PasswordInput";

import MingcuteUser3Line from "@/icons/MingcuteUser3Line";

import styles from "@/app/auth/styles/auth-form.module.css";

export default function SignInForm(): ReactElement {
  const formSubmitHandler = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
  };

  return (
    <div className={styles["auth-form"]}>
      <Card>
        <div className={styles["card-content"]}>
          <div className={styles.writings}>
            <h1>ورود!</h1>
            <form onSubmit={formSubmitHandler}>
              <NormalInputComponent
                label="نام کاربری"
                type="text"
                name="username"
                prefixIcon={<MingcuteUser3Line />}
              />
              <PasswordInputComponent
                label="رمز عبور"
                name="password"
                autoComplete="current-password"
              />
              <Button variant="primary">ورود</Button>
            </form>
            <div className={styles["change-form"]}>
              قبلاً ثبت‌نام نکردید؟
              {` `}
              <Link href="/auth/sign-up">ثبت‌نام کنید</Link>.
            </div>
          </div>
          <div className={styles.visuals}>
            <Image src={signInImage} alt="" />
          </div>
        </div>
      </Card>
    </div>
  );
}
