"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("Debug: Children wrapped in SessionProvider:", children);
  return <SessionProvider>{children}</SessionProvider>;
};