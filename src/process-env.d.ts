export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      'app-protocol': 'http' | 'https';
      'app-url': string;
      'api-path': string;
    }
  }
}
