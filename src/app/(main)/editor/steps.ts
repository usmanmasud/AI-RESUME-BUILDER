import React from "react";
import GenerateInfoForm from "./forms/generateInfoForm";
import PersonalInforForm from "./forms/personalInforForm";
import { EditorFormProps } from "@/lib/types";

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
];
