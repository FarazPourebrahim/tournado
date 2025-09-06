"use client";

import { FormEvent, ReactElement, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import signInImage from "@/assets/images/sign-in.webp";
import { Button } from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import NormalInput from "@/components/NormalInput/NormalInput";
import PasswordInput from "@/components/PasswordInput/PasswordInput";
import { SignInDto } from "@/dto/auth";
import MingcuteUser3Line from "@/icons/MingcuteUser3Line";
import { fetchWithToast } from "@/utils/fetch";
import styles from "@/app/auth/styles/auth-form.module.css";
import { useRouter } from "next/navigation";

export default function SignInForm(): ReactElement {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const formSubmitHandler = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const dto: SignInDto = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    const result = await fetchWithToast<null>(
      "/auth/signin",
      {
        method: "POST",
        body: JSON.stringify(dto),
      },
      "خوش آمدید!",
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
            <h1>ورود!</h1>
            <form ref={formRef} onSubmit={formSubmitHandler}>
              <NormalInput
                label="نام کاربری"
                type="text"
                name="username"
                prefixIcon={<MingcuteUser3Line />}
              />
              <PasswordInput
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
