import React from "react";
import Left from "../../../assets/icon/left";
import Right from "../../../assets/icon/right";
import { Button } from "../Button";

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (nextPage: number) => void;
  className?: string;
};

export const Pagination: React.FC<Props> = ({
  page,
  pageSize,
  total,
  onPageChange,
  className,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div
      className={`flex items-center justify-center gap-6 ${className ?? ""}`}
    >
      <Button
        variant="ghost"
        size="sm"
        disabled={!canPrev}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
        className="h-10 w-10 p-0"
      >
        <Left />
      </Button>

      <div className="text-base font-medium tracking-wide">
        <span className="text-lg font-semibold">{page}</span>
        <span className="opacity-50 mx-1">/</span>
        <span className="opacity-70">{totalPages}</span>
      </div>

      <Button
        variant="ghost"
        size="sm"
        disabled={!canNext}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
        className="h-10 w-10 p-0"
      >
        <Right />
      </Button>
    </div>
  );
};
