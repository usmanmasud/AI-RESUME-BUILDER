"use server";

import openai from "@/lib/openai";
import { generateSummaryInput, generateSummarySchema } from "@/lib/validation";

export async function generateSummary(input: generateSummaryInput) {
  // TODO FOR PREMIUM USERS ONLY

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
