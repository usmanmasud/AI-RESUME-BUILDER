import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  workExperience,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateWorkExperience } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import LoadingBtn from "@/components/LoadingBtn";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import usePremiumModal from "@/hooks/usePremiumModal";
import { canUseAITools } from "@/lib/permissions";

interface GenerateWorkExperienceBtnProps {
  onWorkExperienceGenerate: (workExperience: workExperience) => void;
}

const GenerateWorkExperienceBtn = ({
  onWorkExperienceGenerate,
}: GenerateWorkExperienceBtnProps) => {
  const [showInputDialoq, setShowInputDialoq] = useState(false);

  const subscriptionLevel = useSubscriptionLevel();

  const premiumModal = usePremiumModal();

  return (
    <>
      <Button
        variant={"outline"}
        type="button"
        onClick={() => {
          if (!canUseAITools(subscriptionLevel)) {
            premiumModal.setOpen(true);
            return;
          }

          setShowInputDialoq(true);
        }}
      >
        <WandSparklesIcon className="size-4" />
        Smart fill (AI)
      </Button>
      <InputDialoq
        open={showInputDialoq}
        onOpenChange={setShowInputDialoq}
        onWorkExperienceGenerate={(workExperience) => {
          onWorkExperienceGenerate(workExperience);
          setShowInputDialoq(false);
        }}
      />
    </>
  );
};

export default GenerateWorkExperienceBtn;

interface InputDialoqProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkExperienceGenerate: (workExperience: workExperience) => void;
}

function InputDialoq({
  open,
  onOpenChange,
  onWorkExperienceGenerate,
}: InputDialoqProps) {
  const { toast } = useToast();

  const form = useForm<GenerateWorkExperienceInput>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  });
  async function onSubmit(input: GenerateWorkExperienceInput) {
    try {
      const response = await generateWorkExperience(input);
      if (response instanceof Error) {
        toast({
          description: "An error occurred while generating the summary.",
          variant: "destructive",
        });
      } else {
        onWorkExperienceGenerate(response);
      }
    } catch (error) {
      console.log(error);
      toast({
        description: "An error occurred while generating the summary.",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate work experience</DialogTitle>
          <DialogDescription>
            Describe this work experience and the AI will generate an optimize
            entry just for you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`E.g "from nov nov 2014 to dec 2019 i worked at amazon as machine learning engineer...`}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingBtn type="submit" loading={form.formState.isSubmitting}>
              Generate
            </LoadingBtn>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
