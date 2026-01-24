import { Link } from "react-router-dom";

type BreadcrumbItem = {
  label: string;
  to?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: Props) => {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-secondary">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="inline-flex items-center gap-2"
            >
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="hover:text-background-dark transition"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-background-dark font-medium" : ""}
                >
                  {item.label}
                </span>
              )}

              {!isLast && <span className="opacity-50">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
