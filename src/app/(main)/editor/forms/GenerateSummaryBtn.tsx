import LoadingBtn from "@/components/LoadingBtn";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import React, { useState } from "react";
import { generateSummary } from "./actions";

interface GenerateSummaryBtnProps {
  resumeData: ResumeValues;
  oSummaryGenerated: (summary: string) => void;
}

const GenerateSummaryBtn = ({
  resumeData,
  oSummaryGenerated,
}: GenerateSummaryBtnProps) => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    //   TODO: non premium users only

    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      oSummaryGenerated(aiResponse);
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({
        description: "An error occurred while generating the summary.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingBtn
      variant="outline"
      type="button"
      onClick={handleClick}
      loading={loading}
    >
      <WandSparklesIcon className="size-4" />
      Generate (AI)
    </LoadingBtn>
  );
};

export default GenerateSummaryBtn;
