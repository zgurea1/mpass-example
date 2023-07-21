import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
import { join } from 'path';
import { readFileSync } from 'fs';
import passport from 'passport';
import { Strategy, SamlConfig, VerifiedCallback, VerifyWithoutRequest } from '@node-saml/passport-saml';

export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  SIGNATURE_ALGORITHM,
  WANT_ASSERTIONS_SIGNED,
  DISABLE_REQUESTED_AUTHN_CONTEXT,
  IDENTIFIER_FORMAT,
  ACCEPTED_CLOCK_SKEW_MS,
  ISSUER,
  PROTOCOL,
  PATH_CALLBACK,
  LOGOUTURL,
  ENTRYPOINT,
} = process.env;

export const certMpas = readFileSync(join(__dirname, '/cert/mpass.pem'), 'utf-8');

export const privateKey = readFileSync(join(__dirname, '/cert/key.pem'));

const PASSPORT_SAML: SamlConfig = {
  cert: certMpas,
  privateKey: privateKey,
  signatureAlgorithm: SIGNATURE_ALGORITHM,
  wantAssertionsSigned: false,
  disableRequestedAuthnContext: true,
  identifierFormat: 'true',
  acceptedClockSkewMs: ACCEPTED_CLOCK_SKEW_MS,
  issuer: ISSUER,
  protocol: PROTOCOL,
  path: PATH_CALLBACK,
  logoutUrl: LOGOUTURL,
  entryPoint: ENTRYPOINT,
};

const singupVerify: VerifyWithoutRequest = (profile: any, done: VerifiedCallback) => {
  return done(null, {
    ...profile,
  });
};

const logoutVerify: VerifyWithoutRequest = (profile: any, done: VerifiedCallback) => {
  return done(null, {});
};

export const samlStrategy = new Strategy(PASSPORT_SAML, singupVerify, logoutVerify);

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});
