import axios from "axios";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client({
    client_id: process.env.GOOGLE_CLIENT!,
    client_secret: process.env.GOOGLE_SECRET!,
    redirectUri: process.env.REDIRECT_URI
});

export async function GET(req:any) {
    const code = new URL(req.url).searchParams.get("code");
    if (!code) {
     return new Response("Missing code", { status: 400 });
    }

    const { tokens } = await client.getToken(code!);
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: process.env.GOOGLE_CLIENT,
    });

    const profile = ticket.getPayload();
    const googleUser = {
        googleId: profile?.sub,
        email: profile?.email,
        name: profile?.name,
    };

    let existingUser;

    try {
        const res = await axios.get(`${process.env.SERVER_URL}/users/oauth/${googleUser.googleId}`, {
            headers: {
            "Content-Type": "application/json",
            "User-Agent": "NextAuth-Server",
            "Origin": "http://localhost:3000",},
            withCredentials: true
        });

        existingUser = res.data;
    } catch (error:any) {
        console.log(error?.response?.data)
        if (error.response?.status === 404) {
            const [firstname, lastname] = googleUser.name?.split(" ") ?? ["",""]
            const res = await axios.post(`${process.env.SERVER_URL}/users`,{
                firstname,
                lastname,
                email: googleUser.email || "",
                password: googleUser.googleId,
                providers: [{
                    providerId: googleUser.googleId,
                    provider: "google",
                    email: googleUser.email || ""
                }]
            },{
                headers: {
                "Content-Type": "application/json",
                "User-Agent": "NextAuth-Server",
                "Origin": "http://localhost:3000",},
                withCredentials: true
            });
            existingUser = res.data;
        } else {
            console.error("Unexpected OAuth error:", error);
            return new Response("OAuth Error", { status: 500 });
        }
    }
console.log(existingUser)

    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/profile/${existingUser.userData._id}`)
}
