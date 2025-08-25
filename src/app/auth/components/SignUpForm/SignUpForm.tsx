"use client";

import { ReactElement, FormEvent, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import signUpImage from "@/assets/images/sign-up.webp";
import { Button } from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import NormalInput from "@/components/NormalInput/NormalInput";
import PasswordInput from "@/components/PasswordInput/PasswordInput";
import { SignUpDto } from "@/dto/auth";
import MingcuteIncognitoModeLine from "@/icons/MingcuteIncognitoModeLine";
import MingcuteUser3Line from "@/icons/MingcuteUser3Line";
import MingcuteMailLine from "@/icons/MingcuteMailLine";
import { fetchWithToast } from "@/utils/fetch";
import styles from "@/app/auth/styles/auth-form.module.css";
import { useRouter } from "next/navigation";

export default function SignUpForm(): ReactElement {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
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
      createdAt: Date.now() as unknown as Date,
      updatedAt: Date.now() as unknown as Date,
    };

    const result = await fetchWithToast<null>(
      "/api/auth/sign-up",
      {
        method: "POST",
        body: JSON.stringify(dto),
      },
      "ثبت‌نام با موفقیت انجام شد.",
    );

    if (result.error) {
      return;
    }

    formRef.current?.reset();
    router.push("/dashboard/profile");
  };

  return (
    <div className={styles["auth-form"]}>
      <Card>
        <div className={styles["card-content"]}>
          <div className={styles.writings}>
            <h1>ثبت‌نام!</h1>
            <form ref={formRef} onSubmit={formSubmitHandler}>
              <NormalInput
                label="نام و نام خانوادگی"
                type="text"
                name="name"
                prefixIcon={<MingcuteIncognitoModeLine />}
              />
              <NormalInput
                label="نام کاربری"
                type="text"
                name="username"
                prefixIcon={<MingcuteUser3Line />}
              />
              <NormalInput
                label="ایمیل"
                type="email"
                name="email"
                prefixIcon={<MingcuteMailLine />}
              />
              <PasswordInput
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
