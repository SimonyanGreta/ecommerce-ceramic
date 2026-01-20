export default function CheckSign() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="
            pointer-events-none absolute h-3 w-3 text-background-light
            opacity-0 transition
            peer-checked:opacity-100
          "
    >
      <path
        d="M3.5 8.5 6.5 11.5 12.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
