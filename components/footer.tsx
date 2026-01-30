import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-border py-4">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-4 text-center text-sm text-muted-foreground sm:flex-row">
        <Link href="/about" className="underline-offset-4 hover:underline">
          About
        </Link>
        <span className="hidden sm:inline">·</span>
        <span>&copy; IBuiltThis</span>
      </div>
    </footer>
  );
}
