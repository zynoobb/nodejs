import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

export const googlePassport = passport.use(
  "google-passport",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/login/google",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
