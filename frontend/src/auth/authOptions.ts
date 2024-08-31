import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { LogIn } from "@/graphql/queries/user";
import { graphqlClient } from "@/client/graphqlClient";
import { ContinueWithGoogle } from "@/graphql/mutations/user";

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt: string;
}

interface Profile {
    email: string;
    name: string;
    picture: string;
}

interface Account {
    provider: string;
}

const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

const authOptions = {
    providers: [
        CredentialProvider({
            credentials: {},
            async authorize(credentials: any) {
                const { email, password } = credentials;
                const data = await graphqlClient.request(LogIn, { email, password });

                if (data?.logIn?.status !== 200) {
                    throw new Error(data.logIn?.message);
                }

                const user = data.logIn.user;
                return user || null;
            }
        }),
        GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret
        })
    ],
    callbacks: {
        async session({ session, token }: { session: any, token: any }) {
            session.user.id = token.id;
            session.user.avatar = token.avatar;
            session.user.createdAt = token.createdAt;
            return session;
        },
        async jwt({ token, user, account, profile }: { token: any, user: any, account: Account, profile: Profile }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.avatar = (user.image) ? user.image : user.avatar;
                token.createdAt = user.createdAt;
            }

            if (account?.provider === "google" && profile) {
                const { name, email, picture } = profile;
                const avatar = picture;

                const data = await graphqlClient.request(ContinueWithGoogle, { name, email, avatar });
                if (data.continueWithGoogle.status !== 200 || !data.continueWithGoogle.user) {
                    console.error("Google login failed:", data.continueWithGoogle.message);
                    throw new Error(data.continueWithGoogle.message);
                }
                const dbUser = data.continueWithGoogle.user;
                token.id = dbUser.id;
                token.name = dbUser.name;
                token.email = dbUser.email;
                token.avatar = dbUser.avatar;
                token.createdAt = dbUser.createdAt;
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
};

export default authOptions;