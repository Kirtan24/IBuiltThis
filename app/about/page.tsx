import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Zap, Code2, Palette } from "lucide-react";

export const metadata = {
  title: "About | IBuiltThis",
  description: "Learn about IBuiltThis — a learning project built with Next.js, Supabase, and shadcn UI.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
          About IBuiltThis
        </h1>
        <p className="text-lg text-muted-foreground">
          A small, full-stack learning project to practice Next.js, Supabase,
          and the shadcn/ui component library.
        </p>
      </section>

      <Separator className="mb-10" />

      {/* What it is */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">What is this?</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          IBuiltThis is a showcase app built as a learning project. It includes
          email-based authentication, a profile page with avatar upload, and a
          theme switcher — all implemented with modern patterns and reusable
          components. The goal is to demonstrate a clean structure you can
          refer back to when building your own apps.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          You can sign up, sign in, update your profile and avatar, and switch
          between light and dark themes. Session is stored so you stay logged in
          when you return.
        </p>
      </section>

      {/* Features */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">What’s included</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <Shield className="mb-2 size-5 text-primary" />
              <CardTitle className="text-base">Auth</CardTitle>
              <CardDescription>
                Email sign up and sign in with Supabase. Session persisted in
                cookies so you don’t have to log in again.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Palette className="mb-2 size-5 text-primary" />
              <CardTitle className="text-base">Profile & avatar</CardTitle>
              <CardDescription>
                Update your display name and upload a profile image. Stored in
                Supabase Auth and Storage.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Zap className="mb-2 size-5 text-primary" />
              <CardTitle className="text-base">Theme toggle</CardTitle>
              <CardDescription>
                Light and dark mode in the header. Uses next-themes with the
                shadcn theme system.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Code2 className="mb-2 size-5 text-primary" />
              <CardTitle className="text-base">Server & client</CardTitle>
              <CardDescription>
                Profile and About use server components; forms and navbar use
                client components where needed.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* Tech stack */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Tech stack</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          This project is built with the following tools and libraries:
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Next.js 16 (App Router)</Badge>
          <Badge variant="secondary">React 19</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Supabase (Auth + Storage)</Badge>
          <Badge variant="secondary">shadcn/ui</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
          <Badge variant="secondary">Zod</Badge>
          <Badge variant="secondary">React Hook Form</Badge>
          <Badge variant="secondary">next-themes</Badge>
          <Badge variant="secondary">Lucide icons</Badge>
        </div>
      </section>

      {/* Footer note */}
      <section>
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <p className="text-center text-sm text-muted-foreground">
              Built as a learning project. Use it as a reference for structure,
              auth, forms, and theming in Next.js and shadcn.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
