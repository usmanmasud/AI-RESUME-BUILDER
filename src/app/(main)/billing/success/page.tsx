import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="mx-auto max-w-7xl space-y-6 text-center">
      <h1 className="text-3xl font-bold">Billing success</h1>
      <p>
        The checkout was successfull and subscription has been activated. thanks
        for subscribing
      </p>
      <Button asChild>
        <Link href="/resumes">Go to resumes</Link>
      </Button>
    </main>
  );
};

export default page;
