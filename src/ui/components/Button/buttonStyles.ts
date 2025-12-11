export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const base =
  "inline-flex items-center justify-center rounded-xl select-none " +
  "font-semibold tracking-wide " +
  "transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40";

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-12 px-6 text-lg",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-background-light hover:bg-background-dark hover:text-background-light",
  secondary:
    "bg-secondary text-background-light hover:bg-background-dark hover:text-background-light",
  outline:
    "border border-primary/30 text-background-dark bg-transparent hover:bg-primary hover:text-background-light",
  ghost: "bg-transparent text-background-dark hover:bg-neutral/60",
  danger:
    "border border-primary/30 text-primary bg-transparent hover:bg-primary hover:text-background-light",
};

export function buttonClasses(opts?: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}) {
  const variant = opts?.variant ?? "outline";
  const size = opts?.size ?? "md";
  return cn(
    base,
    sizes[size],
    variants[variant],
    opts?.fullWidth && "w-full",
    opts?.className,
  );
}
