import LoadingBtn from "@/components/LoadingBtn";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import React, { useState } from "react";
import { generateSummary } from "./actions";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import usePremiumModal from "@/hooks/usePremiumModal";
import { canUseAITools } from "@/lib/permissions";

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

  const subscriptionLevel = useSubscriptionLevel();

  const premiumModal = usePremiumModal();

  async function handleClick() {
    if (!canUseAITools(subscriptionLevel)) {
      premiumModal.setOpen(true);
      return;
    }

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
