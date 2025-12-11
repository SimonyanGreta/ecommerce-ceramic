import React from "react";
import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

export function Button({
  variant = "outline",
  size = "md",
  fullWidth,
  loading,
  disabled,
  className,
  children,
  type = "button",
  ref,
  ...rest
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
}
