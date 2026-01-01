'use server';
/**
 * @fileOverview Analyzes a message for potential scams.
 *
 * - analyzeMessage - A function that analyzes a message and returns a risk assessment.
 * - AnalyzeMessageInput - The input type for the analyzeMessage function.
 * - AnalyzeMessageOutput - The return type for the analyzeMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMessageInputSchema = z.object({
  message: z
    .string()
    .describe("The text message to analyze (e.g., from SMS, WhatsApp, or email)."),
});
export type AnalyzeMessageInput = z.infer<typeof AnalyzeMessageInputSchema>;

const AnalyzeMessageOutputSchema = z.object({
  riskLevel: z.enum(['SAFE', 'SUSPICIOUS', 'DANGEROUS']).describe("The calculated risk level for the message."),
  explanation: z
    .string()
    .describe('A simplified, step-by-step explanation of why the message was flagged with that risk level. Use simple language and provide actionable advice.'),
});
export type AnalyzeMessageOutput = z.infer<typeof AnalyzeMessageOutputSchema>;

export async function analyzeMessage(input: AnalyzeMessageInput): Promise<AnalyzeMessageOutput> {
  return analyzeMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMessagePrompt',
  input: {schema: AnalyzeMessageInputSchema},
  output: {schema: AnalyzeMessageOutputSchema},
  prompt: `You are a cybersecurity expert in India, specializing in detecting scams in SMS, WhatsApp, and email messages. Your audience is non-technical, including students, families, and seniors.

  Analyze the following message for common scam tactics used in India, such as:
  - **Urgency:** KYC expiry, account blockage, limited-time offers.
  - **Impersonation:** Pretending to be from a bank (SBI, HDFC, etc.), government body (UIDAI), or a known company (Jio, Airtel).
  - **Suspicious Requests:** Asking for OTPs, PINs, personal details, or to click unknown links or install apps.
  - **Unrealistic Offers:** Lottery wins, unbelievable discounts, free gifts.
  - **Grammar/Spelling:** Poor language and spelling mistakes.

  Based on your analysis, determine the risk level:
  - **SAFE:** The message appears to be a standard, legitimate communication with no red flags.
  - **SUSPICIOUS:** The message contains elements that could be part of a scam but aren't conclusively dangerous. It warrants caution.
  - **DANGEROUS:** The message contains clear and immediate red flags indicating a likely scam or phishing attempt.

  Provide a simple, clear explanation for your conclusion. Start with the most critical finding. Give actionable advice like "Do not click any links" or "Block this sender."

  Message to analyze:
  '''
  {{{message}}}
  '''
  `,
});

const analyzeMessageFlow = ai.defineFlow(
  {
    name: 'analyzeMessageFlow',
    inputSchema: AnalyzeMessageInputSchema,
    outputSchema: AnalyzeMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
