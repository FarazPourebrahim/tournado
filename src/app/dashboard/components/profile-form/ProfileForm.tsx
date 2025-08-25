import { FormEvent, ReactElement, useEffect, useState } from "react";

import { Button } from "@/components/Button/Button";
import CardComponent from "@/components/Card/Card";
import NormalInput from "@/components/NormalInput/NormalInput";
import PasswordInput from "@/components/PasswordInput/PasswordInput";

import { EditProfileDto } from "@/dto/edit-profile.dto";

import MingcuteIncognitoModeLine from "@/icons/MingcuteIncognitoModeLine";
import MingcuteMailLine from "@/icons/MingcuteMailLine";
import MingcuteUser3Line from "@/icons/MingcuteUser3Line";

import { fetchWithToast } from "@/utils/fetch";

import styles from "./ProfileForm.module.css";

export default function ProfileFormComponent(): ReactElement {
  const [values, setValues] = useState<EditProfileDto>({});
  const [status, setStatus] = useState<"pending" | "error" | "success">(
    "pending",
  );

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await fetchWithToast<EditProfileDto>(
        "/api/dashboard/profile",
      );

      if (result.error) {
        setStatus("error");
        return;
      }

      setValues(result.data!);
      setStatus("success");
    };

    fetchProfile().then();
  }, []);

  const formSubmitHandler = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const result = await fetchWithToast<null>(
      "/api/dashboard/profile",
      {
        method: "PATCH",
        body: JSON.stringify(values),
      },
      "ویرایش با موفقیت انجام شد.",
    );

    if (result.error) {
      return;
    }
  };

  if (status === "pending") {
    return <h1>Loading...</h1>;
  }

  if (status === "error") {
    return <h1>نشد که بشه :(</h1>;
  }

  return (
    <CardComponent className={styles["profile-form"]}>
      <h1>ویرایش پروفایل</h1>
      <form onSubmit={formSubmitHandler}>
        <NormalInput
          label="نام و نام خانوادگی"
          type="text"
          name="name"
          prefixIcon={<MingcuteIncognitoModeLine />}
          value={values.name}
          onChange={(e) =>
            setValues((old) => ({ ...old, name: e.target.value }))
          }
        />
        <NormalInput
          label="نام کاربری"
          type="text"
          name="username"
          prefixIcon={<MingcuteUser3Line />}
          value={values.username}
          onChange={(e) =>
            setValues((old) => ({ ...old, username: e.target.value }))
          }
        />
        <NormalInput
          label="ایمیل"
          type="email"
          name="email"
          prefixIcon={<MingcuteMailLine />}
          value={values.email}
          onChange={(e) =>
            setValues((old) => ({ ...old, email: e.target.value }))
          }
        />
        <PasswordInput
          label="رمز عبور"
          name="password"
          autoComplete="new-password"
          value={values.password}
          onChange={(e) =>
            setValues((old) => ({ ...old, password: e.target.value }))
          }
        />
        <Button variant="primary">ذخیره</Button>
      </form>
    </CardComponent>
  );
}
