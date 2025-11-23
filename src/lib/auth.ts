import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createProfile, getProfile } from "./actions";
import { toast } from "sonner";
import axios from "axios";
export const authOptions = {
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT!,
        clientSecret: process.env.GOOGLE_SECRET!,
        authorization: {
                params: {
                    scope: "openid email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
                    prompt:"consent",
                    access_type:"offline",
                    response_type: "code",
                    eventType:"admin",
                }},

    })],
    session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60, updateAge: 24 * 60 * 60,},
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                console.log("Sign-in attempt:", { user, account, profile });
                if (!profile) {
                    console.log("No profile information available");
                    return false;
                }
               
                let existingUser;
                try {
                    const res = await axios.get(`${process.env.SERVER_URL}/users/oauth/${profile?.sub}`, {
                        headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "NextAuth-Server",
                        "Origin": "http://localhost:3000",}
                    })
                    existingUser = res.data;
                } catch (error) {
                    console.log(error.response.data)
                    if (error) {
                        const res = await axios.post(`${process.env.SERVER_URL}/users`,{
                            firstname: user.name?.split(" ")[0] || "",
                            lastname: user.name?.split(" ")[1] || "",
                            email: user.email || "",
                            password: profile?.sub,
                            providers: [{
                                providerId: profile?.sub,
                                provider: "google",
                                email: user.email || ""
                            }]
                        },{
                            headers: {
                            "Content-Type": "application/json",
                            "User-Agent": "NextAuth-Server",
                            "Origin": "http://localhost:3000",}
                        });
                        existingUser = res.data;
                    } else {
                        console.log(error.response.data)
                        console.error("Error fetching user:", error);
                        return false;
                    }
                }
                // Attach user data to the user object
                user.userId = existingUser.userData?._id; // Set the static userId property
                user.token = existingUser.token;
                return true;
            } catch (error) {
                console.error("Error during sign-in logging:", error);
                return false;
            }
    },
        async jwt({ token, user }) {
                if (user && !user.error) {
                    token.serverId = user.userId;
                    token.serverToken = user.token;
                }
            return token;
        },
        async session({ session, token }) {
            if (token && !session.error) {
                session.userId = token.serverId;
                session.token = token.serverToken;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
        signOut: "/auth",
        error: "/error", // Error code passed in query string as ?error=
    },
};

