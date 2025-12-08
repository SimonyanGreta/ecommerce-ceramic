/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
  readonly VITE_USE_API?: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
