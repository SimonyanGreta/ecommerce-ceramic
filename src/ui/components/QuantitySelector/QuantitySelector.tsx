import React from "react";

type Props = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
};

export const QuantitySelector: React.FC<Props> = ({
  value,
  onChange,
  min = 1,
  max = 999,
  disabled,
}) => {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="inline-flex items-center rounded-xl border border-black/10 bg-white">
      <button
        type="button"
        onClick={dec}
        disabled={disabled || value <= min}
        className="h-10 w-10 flex items-center justify-center hover:bg-black/5 disabled:opacity-40"
      >
        −
      </button>

      <div className="h-10 w-12 flex items-center justify-center border-x border-black/10">
        {value}
      </div>

      <button
        type="button"
        onClick={inc}
        disabled={disabled || value >= max}
        className="h-10 w-10 flex items-center justify-center hover:bg-black/5 disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
};
