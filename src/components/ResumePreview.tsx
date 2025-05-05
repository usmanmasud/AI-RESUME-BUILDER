import useDimentions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  clasName?: string;
}
const ResumePreview = ({ resumeData, clasName }: ResumePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimentions(containerRef);

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white to-black",
        clasName,
      )}
      ref={containerRef}
    >
      <div
        style={{
          zoom: (1 / 794) * width,
        }}
        className={cn("space-y-6 p-6", !width && "invisible")}
      >
        <PersonalInfoHeader resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ResumePreview;

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const { phone, firstName, lastName, jobTitle, city, country, photo, email } =
    resumeData;

  const [photoScr, setPhotoScr] = useState(phone instanceof File ? "" : photo);

  useEffect(() => {
    const objectURl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectURl) setPhotoScr(objectURl);
    if (photo == null) setPhotoScr("");

    return () => URL.revokeObjectURL(objectURl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoScr && (
        <Image
          src={photoScr}
          width={100}
          height={100}
          alt="photo"
          className="aspect-square object-cover"
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold">
            {firstName} {lastName}
          </p>
        </div>
      </div>
    </div>
  );
}
