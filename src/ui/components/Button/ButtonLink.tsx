import React from "react";
import { Link, type LinkProps } from "react-router-dom";
import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

type Props = LinkProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

export const ButtonLink: React.FC<Props> = ({
  variant = "outline",
  size = "md",
  fullWidth,
  className,
  children,
  ...rest
}) => {
  return (
    <Link
      {...rest}
      className={buttonClasses({ variant, size, fullWidth, className })}
    >
      {children}
    </Link>
  );
};
