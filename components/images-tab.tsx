"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "tab1", label: "Tab 1", image: "/tabs/tab1.jpg" },
  { id: "tab2", label: "Tab 2", image: "/tabs/tab2.jpg" },
  { id: "tab3", label: "Tab 3", image: "/tabs/tab3.jpg" },
];

export default function ImageTab() {
  const [activeTab, setActiveTab] = useState("tab1");

  const activeImage = TABS.find((t) => t.id === activeTab)?.image;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = TABS.findIndex((t) => t.id === prev);
        const nextIndex = (currentIndex + 1) % TABS.length;
        return TABS[nextIndex].id;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 md:px-10">
        <div
          role="tablist"
          className="mb-6 flex flex-wrap justify-center gap-3"
        >
          {TABS.map((tab) => (
            <Button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-lg px-6 py-2 text-sm transition-all",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-muted">
          <Image
            key={activeImage}
            src={activeImage!}
            alt="Tab preview"
            fill
            priority
            className="object-cover transition-opacity duration-300"
          />
        </div>
      </div>
    </section>
  );
}
