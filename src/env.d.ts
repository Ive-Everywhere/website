/// <reference path="../.astro/types.d.ts" />

interface EluuThemeApi {
  key: string;
  get(): 'light' | 'dark';
  isExplicit(): boolean;
  set(theme: 'light' | 'dark'): void;
  clear(): void;
}

interface Window {
  __eluuTheme?: EluuThemeApi;
}
