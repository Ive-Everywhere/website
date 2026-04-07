/// <reference types="astro/client" />

interface Window {
  posthog?: {
    capture: (event: string, properties?: Record<string, unknown>) => void;
    opt_out_capturing: () => void;
    opt_in_capturing: () => void;
    [key: string]: unknown;
  };
}
