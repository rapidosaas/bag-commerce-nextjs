import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl space-y-5 px-3 py-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
              Find your next cabas
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <Link href="https://www.facebook.com/rapidosaas" target="_blank" className="hover:underline">
              Facebook
            </Link>
            <Link href="https://github.com/rapidosaas" target="_blank" className="hover:underline">
              GitHub
            </Link>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <Link href="/tos" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}