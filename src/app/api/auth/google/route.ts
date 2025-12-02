import { OAuth2Client } from "google-auth-library";
import { NextResponse } from "next/server";

const client = new OAuth2Client({
    client_id: process.env.GOOGLE_CLIENT!,
    client_secret: process.env.GOOGLE_SECRET!,
    redirectUri: process.env.REDIRECT_URI
});

export async function GET(req:any) {
    const url = client.generateAuthUrl({
        scope: "openid email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        prompt:"consent",
        access_type:"offline",
        response_type: "code",
        eventType:"admin",  
    });

    return NextResponse.redirect(url);
}