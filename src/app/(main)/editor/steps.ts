import React from "react";
import GenerateInfoForm from "./forms/generateInfoForm";
import PersonalInforForm from "./forms/personalInforForm";
import { EditorFormProps } from "@/lib/types";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "Generate info", component: GenerateInfoForm, key: "generate-info" },

  {
    title: "Personal info",
    component: PersonalInforForm,
    key: "personal-info",
  },
  {
    title: "Work Experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  {
    title: "Education",
    component: EducationForm,
    key: "education",
  },
  {
    title: "Skiils",
    component: SkillsForm,
    key: "skiils",
  },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
];
