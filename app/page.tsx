import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ImageTab from "@/components/images-tab";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto px-4 py-12 text-center">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              A better way to track your applications
            </h1>
            <p className="mb-8 text-lg font-light text-muted-foreground">
              Capture, organize and manage your job search in one place.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/sign-up" className="no-underline">
                <Button size="lg" className="h-10">
                  Start for Free <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <p className="mb-8 text-muted-foreground">
                Free forever, no credit cards
              </p>
            </div>
          </div>
        </section>

        <section>
          <div>
            <ImageTab />
          </div>
        </section>
      </main>
    </div>
  );
}
