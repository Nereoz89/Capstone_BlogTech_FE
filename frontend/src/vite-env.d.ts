/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  // aggiungi qui tutte le tue variabili VITE_*
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
