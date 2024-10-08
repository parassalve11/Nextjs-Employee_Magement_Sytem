'use server'

import { lucia, validRequest } from "@/auth"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LogOut(){
const {session} = await validRequest();

if(!session){
throw new Error('Unauthorized.')
}

await lucia.invalidateSession(session.id);

const sessionCookie = lucia.createBlankSessionCookie();
cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
)

return redirect('login')
}