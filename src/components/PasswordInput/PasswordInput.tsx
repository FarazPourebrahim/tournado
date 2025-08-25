"use client";

import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  ReactElement,
  useState,
} from "react";

import NormalInput from "@/components/NormalInput/NormalInput";

import MingcuteKey2Line from "@/icons/MingcuteKey2Line";
import MingcuteEye2Line from "@/icons/MingcuteEye2Line";
import MingcuteEyeCloseLine from "@/icons/MingcuteEyeCloseLine";

type Props = ComponentProps<typeof NormalInput>;

function PasswordInput(
  { ...otherProps }: Props,
  ref: ForwardedRef<HTMLInputElement>,
): ReactElement {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <NormalInput
      ref={ref}
      type={isVisible ? "text" : "password"}
      prefixIcon={<MingcuteKey2Line />}
      suffixIcon={isVisible ? <MingcuteEyeCloseLine /> : <MingcuteEye2Line />}
      onSuffixClick={() => setIsVisible((old) => !old)}
      {...otherProps}
    />
  );
}

export default forwardRef(PasswordInput);
