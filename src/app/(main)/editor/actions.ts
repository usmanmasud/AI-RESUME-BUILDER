"use server";

import { canCreateResume, canUseCustomizations } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscriptions";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";

export async function saveResume(values: ResumeValues) {
  const { id } = values;

  console.log("the data sent to backend ", values);

  const { photo, workExperiences, education, ...resumeValues } =
    resumeSchema.parse({
      ...values,
      workExperiences: values.workExperiences || [],
      education: values.education || [],
      skills: values.skills || [],
    });

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (id) {
    const resumeCount = await prisma.resume.count({ where: { userId } });

    if (!canCreateResume(subscriptionLevel, resumeCount)) {
      throw new Error("Maximum resume count reach for this subscription level");
    }
  }

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  const hasCustomizations =
    (resumeValues.borderStyle &&
      resumeValues.borderStyle !== existingResume?.borderStyle) ||
    (resumeValues.colorHex &&
      resumeValues.colorHex !== existingResume?.colorHex);

  if (hasCustomizations && !canUseCustomizations(subscriptionLevel)) {
    throw new Error("Customizations not allowed for this subscription level");
  }

  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
      access: "public",
    });

    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  }

  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,
        skills: resumeValues.skills?.filter(
          (skill): skill is string => skill !== undefined,
        ),
        workExperience: {
          deleteMany: {},
          create: workExperiences.map((exp) => ({
            ...exp,
            startDate: exp?.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp?.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        education: {
          deleteMany: {},
          create: education.map((edu) => ({
            ...edu,
            startDate: edu?.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu?.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        updatedAt: new Date(),
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,
        skills: resumeValues.skills?.filter(
          (skill): skill is string => skill !== undefined,
        ),
        workExperience: {
          create: workExperiences.map((exp) => ({
            ...exp,
            startDate: exp?.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp?.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        education: {
          create: education.map((edu) => ({
            ...edu,
            startDate: edu?.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu?.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  }
}
