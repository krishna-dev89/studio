'use server';
/**
 * @fileOverview Analyzes a phone number for potential scam or spam risk.
 *
 * - checkPhoneRisk - A function that analyzes a phone number and returns a risk assessment.
 * - CheckPhoneRiskInput - The input type for the checkPhoneRisk function.
 * - CheckPhoneRiskOutput - The return type for the checkPhoneRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckPhoneRiskInputSchema = z.object({
  phoneNumber: z
    .string()
    .describe("The phone number to analyze, preferably with country code."),
});
export type CheckPhoneRiskInput = z.infer<typeof CheckPhoneRiskInputSchema>;

const CheckPhoneRiskOutputSchema = z.object({
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).describe("The calculated risk level for the phone number."),
  explanation: z
    .string()
    .describe('A simplified explanation for the risk level, with actionable advice for the user.'),
  reportedActivity: z.array(z.string()).describe("A list of simulated reported activities associated with the number (e.g., 'Spam Calls', 'Phishing Attempts')."),
});
export type CheckPhoneRiskOutput = z.infer<typeof CheckPhoneRiskOutputSchema>;

export async function checkPhoneRisk(input: CheckPhoneRiskInput): Promise<CheckPhoneRiskOutput> {
  return checkPhoneRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkPhoneRiskPrompt',
  input: {schema: CheckPhoneRiskInputSchema},
  output: {schema: CheckPhoneRiskOutputSchema},
  prompt: `You are a phone number risk analysis expert in India. You are analyzing a phone number for a non-technical user.

  IMPORTANT: You do not have access to a real-time database. You must SIMULATE a response based on common patterns.
  
  Analyze the following phone number: {{{phoneNumber}}}

  Simulate a risk analysis based on these fictional rules:
  - If the number looks like a standard Indian mobile number (e.g., starts with +91 and has 10 digits), assign 'LOW' or 'MEDIUM' risk unless other rules apply.
  - If the number is a known telemarketer prefix (e.g., fictional prefix '140'), assign 'MEDIUM' risk and mention "Likely Telemarketer".
  - If the number has been fictionally "reported" for scam activity in your simulation (e.g., numbers ending in '0000'), assign 'HIGH' risk and mention "Reported for Scam Activity".
  - For international numbers (non +91), assign 'MEDIUM' risk and advise caution.

  Your response must include:
  1.  **riskLevel**: 'LOW', 'MEDIUM', or 'HIGH'.
  2.  **explanation**: A simple, clear reason for the risk level. Provide actionable advice like "Block this number," "Do not share OTPs," or "Answer with caution."
  3.  **reportedActivity**: A list of 1-2 simulated activities. For LOW risk, this can be an empty array or ["No suspicious activity reported"]. For MEDIUM/HIGH, it could be ["Spam Calls", "Phishing Attempts"].

  Generate a plausible but clearly simulated response for the user.`,
});

const checkPhoneRiskFlow = ai.defineFlow(
  {
    name: 'checkPhoneRiskFlow',
    inputSchema: CheckPhoneRiskInputSchema,
    outputSchema: CheckPhoneRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
