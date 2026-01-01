"use server";

import { scanUrlSafety, ScanUrlSafetyInput } from "@/ai/flows/scan-url-safety";
import { z } from "zod";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL."),
});

export type UrlSafetyResult =
  | { success: true; data: { riskLevel: 'SAFE' | 'WARNING' | 'DO_NOT_OPEN'; explanation: string; checks: {name: string, passed: boolean}[] } }
  | { success: false; error: string };

export async function getUrlSafety(
  values: ScanUrlSafetyInput
): Promise<UrlSafetyResult> {
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => i.message).join(" ");
    return {
      success: false,
      error: `Invalid input: ${issues}`,
    };
  }

  try {
    const result = await scanUrlSafety({ url: parsed.data.url });
    return { success: true, data: result };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Our AI is currently unavailable. Please try again later.",
    };
  }
}
