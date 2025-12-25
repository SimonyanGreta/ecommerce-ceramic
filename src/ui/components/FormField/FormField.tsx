import React from "react";

type BaseProps = {
  label: string;
  required?: boolean;
  error?: string | null;
  hint?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
  name?: string;
  onBlur?: () => void;
};

type InputProps = BaseProps & {
  as?: "input";
  type?: React.HTMLInputTypeAttribute;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  value: string;
  placeholder?: string;
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type TextareaProps = BaseProps & {
  as: "textarea";
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
};

export type FormFieldProps = InputProps | TextareaProps;

export const FormField: React.FC<FormFieldProps> = (props) => {
  const {
    label,
    required,
    error,
    hint,
    className,
    id,
    disabled,
    name,
    onBlur,
  } = props;

  const reactId = React.useId();
  const fieldId = id ?? reactId;

  const describedBy = error
    ? `${fieldId}-error`
    : hint
      ? `${fieldId}-hint`
      : undefined;

  const base =
    "w-full rounded-xl border px-3 py-2 outline-none transition bg-white " +
    "border-black/10 focus:border-black/30 " +
    "disabled:opacity-60 disabled:bg-black/[0.02] disabled:cursor-not-allowed";

  const errorCls = error ? "border-red-500/50 focus:border-red-500" : "";

  return (
    <div className={className ?? ""}>
      <label htmlFor={fieldId} className="block text-sm">
        <div className="mb-1 flex items-center gap-2">
          <span className="opacity-70">{label}</span>
          {required && <span className="text-red-600">*</span>}
        </div>

        {props.as === "textarea" ? (
          <textarea
            id={fieldId}
            name={name}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            onBlur={onBlur}
            rows={props.rows ?? 4}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={`${base} min-h-[96px] ${errorCls}`}
          />
        ) : (
          <input
            id={fieldId}
            name={name}
            type={props.type ?? "text"}
            inputMode={props.inputMode}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            onBlur={onBlur}
            autoComplete={props.autoComplete}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={`${base} ${errorCls}`}
          />
        )}
      </label>

      {error ? (
        <div id={`${fieldId}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </div>
      ) : hint ? (
        <div id={`${fieldId}-hint`} className="mt-1 text-xs opacity-60">
          {hint}
        </div>
      ) : null}
    </div>
  );
};
