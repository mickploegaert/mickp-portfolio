declare global {
  interface Window {
    onRecaptchaSuccess?: (response: string) => void;
    onRecaptchaExpired?: () => void;
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options?: { action: string }) => Promise<string>;
      reset: () => void;
      getResponse: () => string;
      render: (container: string | HTMLElement, parameters?: any) => string;
    };
  }
}

export {};