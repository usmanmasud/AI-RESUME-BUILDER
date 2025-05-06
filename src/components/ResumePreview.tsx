import useDimentions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";

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
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ResumePreview;

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    phone,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    photo,
    email,
    colorHex,
    borderStyle,
  } = resumeData;

  const [photoScr, setPhotoScr] = useState(photo instanceof File ? "" : photo);

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
          <p
            className="text-3xl font-bold"
            style={{
              color: colorHex,
            }}
          >
            {firstName} {lastName}
          </p>
          <p
            className="font-medium"
            style={{
              color: colorHex,
            }}
          >
            {jobTitle}
          </p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && country ? ", " : ""}
          {country}
          {city || (country && (phone || email)) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;

  if (!summary) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Professional profile
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;

  const workExperiencesNotEmpty = Array.isArray(workExperiences)
    ? workExperiences.filter(
        (exp) => exp && Object.values(exp).filter(Boolean).length > 0,
      )
    : [];

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Work experience
        </p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="font-sm flex items-center justify-between font-semibold"
              style={{
                color: colorHex,
              }}
            >
              <span>{exp?.position}</span>
              {exp?.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{exp?.company}</p>
            <div className="whitespace-pre-line text-xs">
              {exp?.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { education, colorHex } = resumeData;
  const educationsNotEmpty = Array.isArray(education)
    ? education.filter(
        (edu) => edu && Object.values(edu).filter(Boolean).length > 0,
      )
    : [];

  if (!educationsNotEmpty?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Education
        </p>
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="font-sm flex items-center justify-between font-semibold"
              style={{
                color: colorHex,
              }}
            >
              <span>{edu?.degree}</span>
              {edu?.startDate && (
                <span>
                  {formatDate(edu.startDate, "MM/yyyy")}{" "}
                  {edu.endDate ? `- ${formatDate(edu.endDate, "MM/yyyy")}` : ""}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{edu?.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              style={{
                backgroundColor: colorHex,
              }}
              key={index}
              className="rounded-md bg-black text-white hover:bg-black"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
