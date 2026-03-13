import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";

export const auth = betterAuth({
    baseURL: "http://localhost:5173",
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        }
    }
});