import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  clasName?: string;
}
const ResumePreview = ({ resumeData, clasName }: ResumePreviewProps) => {
  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white to-black",
        clasName,
      )}
    >
      <h1 className="p-6 text-3xl font-bold">
        This text should change with the size of the container div
      </h1>
    </div>
  );
};

export default ResumePreview;
