"use server";

import openai from "@/lib/openai";
import { canUseAITools } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscriptions";
import {
  generateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  workExperience,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

export async function generateSummary(input: generateSummaryInput) {
  // TODO FOR PREMIUM USERS ONLY

  const { userId } = await auth();
  if (!userId) {
    return new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Ugrsade your subscription to use this feature");
  }

  const { jobTittle, workExperiences, education, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `You are a resume generator. You will be given a job title and a list of work experiences, education, and skills. Your task is to generate a summary for the resume based on the provided information. The summary should be concise and highlight the most relevant experiences and skills for the job title. The summary should be in English. only return the summary without any additional text or explanation. keep it concise and professional.  `;

  const userMessage = `Please generate a professional summary for the following job title: ${jobTittle || "N/A"}. Here are the details:
    Work Experiences: ${workExperiences
      .map(
        (exp) => `
        Position: ${exp?.position || "N/A"} at ${exp?.company || "N/A"} from ${exp?.startDate || "N/A"} to ${exp?.endDate || "Present"}. Description: ${exp?.description || "N/A"}
        `,
      )
      .join("\n\n")}
       Education: ${education
         .map(
           (edu) => `
        Position: ${edu?.degree || "N/A"} at ${edu?.school || "N/A"} from ${edu?.startDate || "N/A"} to ${edu?.endDate || "N/A"}.}
        `,
         )
         .join("\n\n")}
          Skills: ${skills}
            `;

  console.log("System Message: ", systemMessage);
  console.log("User Message: ", userMessage);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("No response from OpenAI API");
  }

  return aiResponse;
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput,
) {
  // Block for non -premium users
  const { userId } = await auth();
  if (!userId) {
    return new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Upgrade your subscription to use this feature");
  }

  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `You are a resume generator. You will be given a description of the work experience. Your task is to generate a work experience entry for the resume based on the provided information. The work experience should be concise and highlight the most relevant experiences and skills. The work experience should be in English. Only return the work experience without any additional text or explanation. Keep it concise and professional. You can omit fields if they can't be inferred from the provided information, but don't add any new ones.

  Format:
  - Job Title: <job title>
  - Company: <company name>
  - Start Date: <format: YYYY-MM-DD> (only if provided)
  - End Date: <format: YYYY-MM-DD> (only if provided)
  - Description: <an optimized description in bullet format, inferred from the provided information>`;

  const userMessage = `Please generate a work experience entry from this description: ${description || "N/A"}.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("No response from OpenAI API");
  }

  console.log(aiResponse);

  return {
    position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
    company: aiResponse.match(/Company: (.*)/)?.[1] || "",
    description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  } satisfies workExperience;
}
