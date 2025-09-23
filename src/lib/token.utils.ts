import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    const cookieStore = await cookies();

    const encodedToken =
        cookieStore.get("next-auth.session-token")?.value ||
        cookieStore.get("__Secure-next-auth.session-token")?.value;

    if (!encodedToken) {
        return undefined;
    }

    const decodeToken = await decode({
        token: encodedToken,
        secret: process.env.NEXTAUTH_SECRET!,
    });

    const token = decodeToken?.token;

console.log(token);


    return token;
}


// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export async function getUserToken() {
//     const encodedToken = (await cookies()).get(
//         "next-auth.session-token"
//     )?.value;
//     const decryptedToken = await decode({
//         token: encodedToken,
//         secret: process.env.AUTH_SECRET!,
//     });
//     const token = decryptedToken?.token;

//     console.log(token);
    

//     return token;
// }