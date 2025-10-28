export default function EmptyCart() {
  return (
    <svg
      width="58"
      height="58"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          dur="0.35s"
          repeatCount="indefinite"
          values="
            0 0;
            -0.35 0.15;
            0.35 -0.15;
            -0.25 0.1;
            0.25 -0.1;
            0 0
          "
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          additive="sum"
          dur="0.35s"
          repeatCount="indefinite"
          values="
            0 12 12;
            -2 12 12;
            2 12 12;
            -1 12 12;
            1 12 12;
            0 12 12
          "
        />

        <path
          d="M6 6h15l-1.5 8H8L6 6Z"
          stroke="#b7410e"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M6 6 5 3H2"
          stroke="#b7410e"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="9" cy="19" r="1.6" stroke="#70170f" strokeWidth="1.8" />
        <circle cx="18" cy="19" r="1.6" stroke="#70170f" strokeWidth="1.8" />
      </g>
    </svg>
  );
}
