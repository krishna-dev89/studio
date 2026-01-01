"use server";

import { explainFutureThreats, ExplainFutureThreatsInput } from "@/ai/flows/explain-future-threats";
import { z } from "zod";

const formSchema = z.object({
  threat: z.string().min(1, "Please select a threat to explain."),
});

type ThreatExplanationResult = 
  | { success: true; data: { explanation: string } }
  | { success: false; error: string };

export async function getThreatExplanation(
  values: ExplainFutureThreatsInput
): Promise<ThreatExplanationResult> {
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid input. Please select a threat.",
    };
  }

  try {
    const result = await explainFutureThreats({ threat: parsed.data.threat });
    return { success: true, data: result };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Failed to generate explanation. Please try again later.",
    };
  }
}
