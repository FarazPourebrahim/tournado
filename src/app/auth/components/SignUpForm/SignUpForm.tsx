"use client";

import { ReactElement, FormEvent } from "react";

import Image from "next/image";
import Link from "next/link";

import { toast } from "react-toastify";

import signUpImage from "@/assets/images/sign-up.webp";

import { Button } from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import NormalInputComponent from "@/components/NormalInput/NormalInput";
import PasswordInputComponent from "@/components/PasswordInput/PasswordInput";

import { SignUpDto } from "@/dto/auth";

import MingcuteIncognitoModeLine from "@/icons/MingcuteIncognitoModeLine";
import MingcuteUser3Line from "@/icons/MingcuteUser3Line";
import MingcuteMailLine from "@/icons/MingcuteMailLine";

import styles from "@/app/auth/styles/auth-form.module.css";

export default function SignUpForm(): ReactElement {
  const formSubmitHandler = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const dto: SignUpDto = {
      name: formData.get("name") as string,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(dto),
    });

    const result = await response.json();

    if (!response.ok) {
      let message: string = "خطای غیرمنتظره رخ داد.";

      if ("error" in result) {
        message = result.error;
      }

      toast.error(message);
      return;
    }

    toast.success("ثبت‌نام با موفقیت انجام شد.");
  };

  return (
    <div className={styles["auth-form"]}>
      <Card>
        <div className={styles["card-content"]}>
          <div className={styles.writings}>
            <h1>ثبت‌نام!</h1>
            <form onSubmit={formSubmitHandler}>
              <NormalInputComponent
                label="نام و نام خانوادگی"
                type="text"
                name="name"
                prefixIcon={<MingcuteIncognitoModeLine />}
              />
              <NormalInputComponent
                label="نام کاربری"
                type="text"
                name="username"
                prefixIcon={<MingcuteUser3Line />}
              />
              <NormalInputComponent
                label="ایمیل"
                type="email"
                name="email"
                prefixIcon={<MingcuteMailLine />}
              />
              <PasswordInputComponent
                label="رمز عبور"
                name="password"
                autoComplete="new-password"
              />
              <Button variant="primary">ثبت‌نام</Button>
            </form>
            <div className={styles["change-form"]}>
              قبلاً ثبت‌نام کردید؟
              {` `}
              <Link href="/auth/sign-in">وارد شوید</Link>.
            </div>
          </div>
          <div className={styles.visuals}>
            <Image src={signUpImage} alt="" />
          </div>
        </div>
      </Card>
    </div>
  );
}
