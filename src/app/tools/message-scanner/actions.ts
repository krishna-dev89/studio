"use server";

import { analyzeMessage, AnalyzeMessageInput } from "@/ai/flows/analyze-message";
import { z } from "zod";

const formSchema = z.object({
  message: z.string().min(10, "Please enter a message with at least 10 characters."),
});

export type ScamAnalysisResult =
  | { success: true; data: { riskLevel: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS'; explanation: string; } }
  | { success: false; error: string };

export async function getScamAnalysis(
  values: AnalyzeMessageInput
): Promise<ScamAnalysisResult> {
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => i.message).join(" ");
    return {
      success: false,
      error: `Invalid input: ${issues}`,
    };
  }

  try {
    const result = await analyzeMessage({ message: parsed.data.message });
    return { success: true, data: result };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Our AI is currently unavailable. Please try again later.",
    };
  }
}
