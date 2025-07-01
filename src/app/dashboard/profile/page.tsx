"use client";

import LoadingButton from "@/components/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { ProfileValues, profileSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Profile from "@/lib/types/profile";

import { randomImages } from "@/lib/avatars";

export default function ProfileForm() {
    const { data: session } = useSession();

    if (!session) {
        redirect("/");
    }

    const [defaultValues, setDefaultValues] = useState<Profile | undefined>({} as Profile);
    const [usernameError, setUsernameError] = useState("");

    const form = useForm<ProfileValues>({
        defaultValues,
        resolver: zodResolver(profileSchema),
    });

    const {
        handleSubmit,
        control,
        setFocus,
        reset,
    formState: { isSubmitting },
    } = form;

    useEffect(() => {
        if (session) {
            // Fetch the user's profile data
            fetch("/api/dashboard/profile", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Data:', data);
                const profileData = {
                  ...data.profile
                };
                setDefaultValues(profileData);
                reset(profileData);
            });
        } else {
            redirect("/");
        }
    }, [session, reset]);

    console.log('Default Values:', defaultValues);


    const checkUsernameAvailability = async (username: string, userId: string | undefined) => {
      const response = await fetch("/api/dashboard/check-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, userId }),
      });
      const data = await response.json();
      return data.isAvailable;
    };

    async function onSubmit(values: ProfileValues) {
        const isAvailable = await checkUsernameAvailability(values.username, session?.user?.id);
        if (!isAvailable) {
          setUsernameError('Username is already taken');
          return;
        } else {
          setUsernameError("");
        }
        try {
            await fetch("/api/dashboard/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    userId: session?.user?.id,
                }),
            });
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    }

    const availableAvatars = randomImages;

  return (
    <main className="m-auto my-10 max-w-4xl space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Profile</h1>
        <p className="text-muted-foreground">
          Get your profile seen by thousands of customers.
        </p>
      </div>
      <div className="space-y-6 rounded-lg border p-4">
        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  {usernameError && <FormMessage>{usernameError}</FormMessage>}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} 
                      type="url"
                      placeholder="https://example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <Label onClick={() => setFocus("bio")}>
                    Bio
                  </Label>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Avatar</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={(e: string) => {
                                    field.onChange(e);
                                }}
                                defaultValue={field.value}
                                value={field.value}
                                className="flex flex-row flex-wrap gap-2 max-xl:justify-center"
                            >
                                {availableAvatars.map((image) => (
                                    <FormItem key={image.name.src}>
                                        <FormLabel className="[&:has([data-state=checked])>img]:border-primary [&:has([data-state=checked])>img]:border-1 [&:has([data-state=checked])>img]:p-px cursor-pointer">
                                            <FormControl>
                                                <RadioGroupItem
                                                    value={image.source}
                                                    className="sr-only"
                                                />
                                            </FormControl>

                                            <Image
                                                key={image.name.src}
                                                src={image.name}
                                                alt="avatar"
                                                className="h-12 w-12 rounded-full border hover:p-px hover:border-primary transition-transform"
                                            />
                                        </FormLabel>
                                    </FormItem>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <LoadingButton type="submit" loading={isSubmitting}>
              Save
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  );
}
