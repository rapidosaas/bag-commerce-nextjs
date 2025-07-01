import { z } from "zod";

const requiredString = z.string().min(1, "This field is required");

export const singInSchema = z.object({
  email: z.string().email(),
});

export const profileSchema = z.object({
  username: requiredString.max(20).regex(/^\w+$/, "Username can only contain letters, numbers, and underscores"),
  name: requiredString.max(50),
  website: z.string().url(),
  bio: z.string().max(250),
  image: z.string(),
});

export type ProfileValues = z.infer<typeof profileSchema>;
