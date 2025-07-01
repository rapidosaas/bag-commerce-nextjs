"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAvatarSource } from "@/lib/avatars";

export default function Navbar() {
  const router = useRouter();

  const { data: session } = useSession();

  console.log('Session NavBar:', session);

  const [avatar, setAvatar] = useState<string | null>(getAvatarSource(null));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (session) {
      // Fetch the user's profile data to get the avatar
      fetch("/api/dashboard/avatar", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        })
        .then((response) => { 
          if (response.status === 404) {
            // Profile not found, set a default avatar
            setAvatar(getAvatarSource(null));
            return null;
          }
          return response.json();
        })
        .then((data) => {
          console.log('Data:', data);
          if (!data) return;
          setAvatar(data.avatar);
        })
        .catch((error) => {
          console.error("Error fetching avatar:", error);
        });
    }
  }, [session]);

  const NavLinks = [
    { 
      href: "/about", 
      label: "About",
    },
  ];

  const AuthenticatedNavLinks = [
    { 
      href: "/cabas", 
      label: "Cabas",
    },
  ];

  const renderNavLinks = (links: Array<{href: string, label: string}>, onClick?: () => void) => (
    links.map((link) => (
      <Link 
        key={link.href} 
        href={link.href} 
        className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md transition-colors text-gray-700 hover:text-black"
        onClick={onClick}
      >
        {link.label}
      </Link>
    ))
  );

  if (!session) {
    return (
      <header className="shadow-sm bg-white">
        <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
          <Link href="/">
          <h1 className="flex items-center text-2xl font-bold">
            <span className="text-blue-300">Cabas</span><span className="text-blue-600">Business</span>
          </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
              {renderNavLinks(NavLinks)}
            </div>
            <div className="flex space-x-2">
              <Button asChild variant="default" className="px-4 py-2">
                <Link href="/auth/sign-in">Login</Link>
              </Button>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="shadow-sm bg-white">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/">
        <h1 className="flex items-center text-2xl font-bold">
          <span className="text-blue-300">Cabas</span><span className="text-blue-600">Business</span>
        </h1>
        </Link>
        <div className="flex items-center space-x-4">
          {/* Desktop nav links */}
          <div className="hidden md:flex space-x-4">
            {renderNavLinks(AuthenticatedNavLinks)}
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex items-center px-2 py-1 border rounded text-gray-700 border-gray-300 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="size-10 cursor-pointer border border-border items-center">
                <AvatarImage src={getAvatarSource(avatar)} alt="@shadcn" />
                <AvatarFallback>
                  {session?.user?.email
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="flex flex-col">
                <span>My Account</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {session?.user?.email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/dashboard/profile");
                  }}
                >
                  Profile
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <div className="flex flex-col px-4 py-2 space-y-2">
            {renderNavLinks(AuthenticatedNavLinks, () => setMobileMenuOpen(false))}
          </div>
        </div>
      )}
    </header>
  );
}