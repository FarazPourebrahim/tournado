"use client";

import { ReactElement, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button/Button";

type Props = {
  children: ReactNode;
};

export default function ReturnButton({ children }: Props): ReactElement {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <Button variant={"primary"} shape={"outlined"} onClick={handleClick}>
      {children}
    </Button>
  );
}
