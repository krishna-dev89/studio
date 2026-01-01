'use server';

import { checkPhoneRisk, CheckPhoneRiskInput } from "@/ai/flows/check-phone-risk";
import { z } from "zod";

const formSchema = z.object({
  phoneNumber: z.string().min(10, "Please enter a valid phone number with at least 10 digits.").max(15, "Phone number is too long."),
});

export type PhoneRiskResult =
  | { success: true; data: { riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'; explanation: string; reportedActivity: string[]; location?: string; } }
  | { success: false; error: string };

export async function getPhoneRisk(
  values: CheckPhoneRiskInput
): Promise<PhoneRiskResult> {
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => i.message).join(" ");
    return {
      success: false,
      error: `Invalid input: ${issues}`,
    };
  }

  try {
    const result = await checkPhoneRisk({ phoneNumber: parsed.data.phoneNumber });
    return { success: true, data: result };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Our AI is currently unavailable. Please try again later.",
    };
  }
}
