import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    const encodedToken = (await cookies()).get(
        "next-auth.session-token"
    )?.value;
    const decryptedToken = await decode({
        token: encodedToken,
        secret: process.env.AUTH_SECRET!,
    });
    const token = decryptedToken?.token;

    console.log(token);
    

    return token;
}
