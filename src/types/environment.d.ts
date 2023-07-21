// eslint-disable-next-line prettier/prettier
export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: string | number;
      LOG_FORMAT: string;
      LOG_DIR: string;
      ORIGIN: string;
      CREDENTIALS: string;
      SIGNATURE_ALGORITHM: 'sha1' | 'sha256' | 'sha512';
      WANT_ASSERTIONS_SIGNED: string;
      DISABLE_REQUESTED_AUTHN_CONTEXT: string;
      IDENTIFIER_FORMAT: string;
      ACCEPTED_CLOCK_SKEW_MS: number;
      ISSUER: string;
      PROTOCOL: string;
      PATH_CALLBACK: string;
      LOGOUTURL: string;
      ENTRYPOINT: string;
    }
  }
}
