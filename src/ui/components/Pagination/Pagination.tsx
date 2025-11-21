import React from "react";
import Left from "../../../assets/icon/left";
import Right from "../../../assets/icon/right";

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
      <button
        type="button"
        disabled={!canPrev}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
        className={`
          h-8 w-8 inline-flex items-center justify-center
          ${canPrev ? "hover:cursor-pointer active:scale-95" : "opacity-40 cursor-not-allowed"}
        `}
      >
        <Left />
      </button>

      <div className="text-sm font-medium tracking-wide">
        <span className="text-base font-semibold">{page}</span>
        <span className="opacity-50 mx-1">/</span>
        <span className="opacity-70">{totalPages}</span>
      </div>

      <button
        type="button"
        disabled={!canNext}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
        className={`
          h-8 w-8 inline-flex items-center justify-center
          ${canNext ? "hover:cursor-pointer active:scale-95" : "opacity-40 cursor-not-allowed"}
        `}
      >
        <Right />
      </button>
    </div>
  );
};
