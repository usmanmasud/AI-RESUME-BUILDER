import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { steps } from "./steps";
import { FileUser, PenLineIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface footerProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResume: boolean;
  setShowSmResume: (show: boolean) => void | undefined;
  isSaving: boolean;
}

const Footer = ({
  currentStep,
  setCurrentStep,
  setShowSmResume,
  showSmResume,
  isSaving,
}: footerProps) => {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;
  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Previous step
          </Button>
          <Button
            disabled={!nextStep}
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
          >
            Next step
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSmResume?.(!showSmResume)}
          className="md:hidden"
          title={showSmResume ? "Edit resume" : "View resume"}
        >
          {showSmResume ? <PenLineIcon /> : <FileUser />}
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <p
            className={cn(
              "text-muted-foreground opacity-0",
              isSaving && "opacity-100",
            )}
          >
            Saving...
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
