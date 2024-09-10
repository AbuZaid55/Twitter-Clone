import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { LogIn } from "@/graphql/queries/user";
import { graphqlClientInDockerContainer } from "@/client/graphqlClient";
import { Account , Profile as NextAuthProfile } from "next-auth";
import { ContinueWithGoogle } from "@/graphql/mutations/user";
interface GoogleProfile extends NextAuthProfile {
    picture?: string;
}

const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

const authOptions = {
    providers: [
        CredentialProvider({
            credentials: {},
            async authorize(credentials: any): Promise<any> {
                const { email, password } = credentials;
                try {
                    const data = await graphqlClientInDockerContainer.request(LogIn, { email, password });
                    return {twitter_token:data.logIn}
                } catch (error:any) {
                    console.log("LoginError",error)
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
        async jwt({ token, user, account, profile }: { token: any, user: any, account: Account | null, profile?:GoogleProfile }) {
            if (account?.provider === "google" && profile) {
                const { name, email, picture } = profile;
                if(!name || !email) return null;
                try {
                    const data = await graphqlClientInDockerContainer.request(ContinueWithGoogle, { name, email, avatar:picture?picture:'' });
                    token.twitter_token = data?.continueWithGoogle  
                } catch (error:any) {
                    console.log("ContinueWithGoogleError",error)
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