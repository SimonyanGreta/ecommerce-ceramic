import type { InputHTMLAttributes } from "react";
import CheckSign from "../../../assets/icon/check_sign";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  description?: string;
  error?: boolean;
};

export const Checkbox = ({
  label,
  description,
  error = false,
  className,
  id,
  disabled,
  ...props
}: Props) => {
  return (
    <label
      htmlFor={id}
      className={[
        "inline-flex items-start gap-2 select-none text-sm",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className ?? "",
      ].join(" ")}
    >
      <span className="relative mt-0.5 inline-flex items-center justify-center shrink-0">
        <input
          id={id}
          type="checkbox"
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />

        <span
          className={[
            "h-4 w-4 rounded border transition",
            error
              ? "border-red-500/60"
              : "border-primary/30 peer-checked:border-primary peer-checked:bg-primary",
            !disabled &&
              "peer-focus-visible:outline peer-focus-visible:outline-primary/30",
          ].join(" ")}
        />
          <CheckSign />
        </span>

      {(label || description) && (
        <span className="flex flex-col">
          {label && (
            <span className={error ? "text-red-700" : "text-inherit"}>
              {label}
            </span>
          )}

          {description && (
            <span
              className={[
                "mt-0.5 text-xs",
                error ? "text-red-600/80" : "text-secondary/70",
              ].join(" ")}
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
};
