import { ResumeValues } from "@/lib/validation";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

const ResumePreviewSection = ({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) => {
  return <div>ResumePreviewSection</div>;
};

export default ResumePreviewSection;
