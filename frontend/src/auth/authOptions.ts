import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { LogIn } from "@/graphql/queries/user";
import { graphqlClient } from "@/client/graphqlClient";
import { ContinueWithGoogle } from "@/graphql/mutations/user";
import { Account, Profile } from "@/interfaces";


const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

const authOptions = {
    providers: [
        CredentialProvider({
            credentials: {},
            async authorize(credentials: any): Promise<any> {
                const { email, password } = credentials;
                try {
                    const data = await graphqlClient.request(LogIn, { email, password });
                    return {twitter_token:data.logIn}
                } catch (error:any) {
                    throw new Error(error?.response?.errors[0]?.message)
                }
            }
        }),
        GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret
        })
    ],
    callbacks: {
        async session({ session, token }: { session: any, token: any }) {
            session.user.twitter_token = token.twitter_token
            return session;
        },
        async jwt({ token, user, account, profile }: { token: any, user: any, account: Account, profile: Profile }) {

            if (account?.provider === "google" && profile) {
                const { name, email, picture } = profile;
                const avatar = picture;
                try {
                    const data = await graphqlClient.request(ContinueWithGoogle, { name, email, avatar });
                    token.twitter_token = data?.continueWithGoogle
                } catch (error:any) {
                    console.log(error?.response?.errors[0]?.message)
                    return null;
                }
            }
            else if (user) {
                token.twitter_token = user.twitter_token
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
};

export default authOptions;