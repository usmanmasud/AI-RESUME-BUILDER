"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ResumeEditor = () => {
  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Start Crafting your resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to bring your resume to live. your progress
          will be auto matically saved
        </p>
      </header>
      <main className="relative h-36 grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="w-full md:w-1/2">left</div>
          <div className="grow md:border-r" />
          <div className="hidden w-1/2 md:flex">right</div>
        </div>
      </main>
      <footer className="w-full border-t px-3 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="secondary">Previous step</Button>
            <Button>Next step</Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" asChild>
              <Link href="/resumes">Close</Link>
            </Button>
            <p className="text-muted-foreground opacity-0">Saving...</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResumeEditor;
