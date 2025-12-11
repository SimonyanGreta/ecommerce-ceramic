import React from "react";
import { Button } from "../Button";

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

  const canDec = !disabled && value > min;
  const canInc = !disabled && value < max;

  return (
    <div className="inline-flex items-center rounded-xl border border-black/10 bg-white">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={dec}
        disabled={!canDec}
        aria-label="Decrease quantity"
      >
        −
      </Button>

      <div className="h-10 w-12 flex items-center justify-center">
        {value}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={inc}
        disabled={!canInc}
        aria-label="Increase quantity"
      >
        +
      </Button>
    </div>
  );
};
