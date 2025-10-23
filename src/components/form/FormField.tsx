import React from "react";

type BaseProps = {
  label: string;
  required?: boolean;
  error?: string | null;
  hint?: string;
  className?: string;
  id?: string;
};

type InputProps = BaseProps & {
  as?: "input";
  type?: React.HTMLInputTypeAttribute;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
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
  } = props;

  const fieldId = id ?? React.useId();
  const describedById = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined;

  const common =
    "w-full rounded-xl border px-3 py-2 outline-none transition " +
    "bg-white " +
    "border-black/10 focus:border-black/30";

  const errorCls = error ? "border-red-500/50 focus:border-red-500" : "";
  const wrapperCls = className ?? "";

  return (
    <label className={`block text-sm ${wrapperCls}`} htmlFor={fieldId}>
      <div className="mb-1 flex items-center gap-2">
        <span className="opacity-70">{label}</span>
        {required && <span className="text-red-600">*</span>}
      </div>

      {props.as === "textarea" ? (
        <textarea
          id={fieldId}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          rows={props.rows ?? 4}
          aria-invalid={!!error}
          aria-describedby={describedById}
          className={`${common} min-h-[96px] ${errorCls}`}
        />
      ) : (
        <input
          id={fieldId}
          type={props.type ?? "text"}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          autoComplete={props.autoComplete}
          aria-invalid={!!error}
          aria-describedby={describedById}
          className={`${common} ${errorCls}`}
        />
      )}

      {error ? (
        <div id={`${fieldId}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </div>
      ) : hint ? (
        <div id={`${fieldId}-hint`} className="mt-1 text-xs opacity-60">
          {hint}
        </div>
      ) : null}
    </label>
  );
};
