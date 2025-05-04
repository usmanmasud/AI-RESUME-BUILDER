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
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
