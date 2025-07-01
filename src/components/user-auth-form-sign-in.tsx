"use client"

import * as React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { singInSchema } from "@/lib/validations"
import * as z from "zod"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { signIn } from "next-auth/react"

type FormData = z.infer<typeof singInSchema>

export function UserAuthFormSignIn() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(singInSchema),
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onSubmit(formData : FormData) {
        setIsLoading(true)

        try {
            signIn("nodemailer", { redirectTo: "/dashboard", ...formData })
            setIsLoading(false)
        } catch (error) {
            console.error("Error signing in with email", error)
            setIsLoading(false)
        }
    }

    return (
        <div className="grid gap-6 max-w-[400px] md:max-w-[500px] mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <label className="sr-only" htmlFor="email">
                            Email
                        </label>
                        <Input
                            className="input input-bordered w-full max-w-xs"
                            id="email"
                            placeholder="username@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("email")}
                        />
                        {errors?.email && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <button
                        className={`${buttonVariants({ variant: "default" })}`}
                        disabled={isLoading}
                        type="submit"
                    >
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Send me magic link
                    </button>
                </div>
            </form>
        </div>
    )
}