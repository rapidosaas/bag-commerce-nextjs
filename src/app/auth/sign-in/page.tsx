"use client"
import { UserAuthFormSignIn } from "@/components/user-auth-form-sign-in"
import Link from "next/link";
import { redirect } from 'next/navigation'
import { useSession } from "next-auth/react";

export default function SignIn() {

    const { data: session } = useSession();

    if (session) {
            redirect('/dashboard');
    }

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Sign in with Email
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        By signing in, you agree to our <Link href="/tos"><u>Terms of Service</u></Link> and <Link href="/privacy-policy"><u>Privacy Policy</u></Link>
                    </p>
                </div>
                <UserAuthFormSignIn />
            </div>
        </div>
    )
}