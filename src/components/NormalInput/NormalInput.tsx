import { ComponentProps, ReactElement, forwardRef, ForwardedRef } from "react";

import clsx from "clsx";

import { Button } from "@/components/Button/Button";

import styles from "./NormalInput.module.css";

type Props = ComponentProps<"input"> & {
  label: string;
  prefixIcon?: ReactElement;
  suffixIcon?: ReactElement;
  onSuffixClick?: ComponentProps<typeof Button>["onClick"];
};

function NormalInput(
  {
    label,
    prefixIcon,
    suffixIcon,
    onSuffixClick,
    className,
    ...otherProps
  }: Props,
  ref: ForwardedRef<HTMLInputElement>,
): ReactElement {
  return (
    <label className={clsx(styles["normal-input"], className)}>
      <div className={styles["label-text"]}>{label}</div>
      <div className={styles.box}>
        {prefixIcon && (
          <div className={styles["prefix-icon"]}>{prefixIcon}</div>
        )}
        <input ref={ref} placeholder="" {...otherProps} />
        {suffixIcon && (
          <Button type="button" shape="inherit" onClick={onSuffixClick}>
            <div className={styles["suffix-icon"]}>{suffixIcon}</div>
          </Button>
        )}
      </div>
    </label>
  );
}

export default forwardRef(NormalInput);
