import React from "react";
import GenerateInfoForm from "./forms/generateInfoForm";
import PersonalInforForm from "./forms/personalInforForm";

export const steps: {
  title: string;
  component: React.ComponentType;
  key: string;
}[] = [
  { title: "Generate info", component: GenerateInfoForm, key: "generate-info" },
  {
    title: "Personal info",
    component: PersonalInforForm,
    key: "personal-info",
  },
];
