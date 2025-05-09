import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const GeneralInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof GeneralInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Invalid file type. Please upload an image file.",
    )
    .refine(
      (file) => !file || file.size <= 1025 * 1024 * 4,
      "File size too large. Please upload a smaller image less than 4mb.",
    ),
  FirstName: optionalString,
  LastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperiences: z.array(
    z
      .object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      })
      .optional(),
  ),
});

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

export type workExperience = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperiences"]
>[number];

export const EducationSchema = z.object({
  education: z.array(
    z
      .object({
        degree: optionalString,
        school: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      })
      .optional(),
  ),
});

export type EducationValues = z.infer<typeof EducationSchema>;

export const skillSchema = z.object({
  skills: z.array(z.string().trim().optional()),
});

export type SkillValues = z.infer<typeof skillSchema>;

export const summarySchema = z.object({
  summary: optionalString,
});

export type SummaryValues = z.infer<typeof summarySchema>;

export const resumeSchema = z.object({
  ...GeneralInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...EducationSchema.shape,
  ...skillSchema.shape,
  ...summarySchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};

export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(20, "Description should be at least 20 characters long"),
});

export type GenerateWorkExperienceInput = z.infer<
  typeof generateWorkExperienceSchema
>;

export const generateSummarySchema = z.object({
  jobTittle: optionalString,
  ...workExperienceSchema.shape,
  ...EducationSchema.shape,
  ...skillSchema.shape,
});

export type generateSummaryInput = z.infer<typeof generateSummarySchema>;
