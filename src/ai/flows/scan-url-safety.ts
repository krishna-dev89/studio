'use server';
/**
 * @fileOverview Analyzes a URL for safety.
 *
 * - scanUrlSafety - A function that analyzes a URL and returns a safety assessment.
 * - ScanUrlSafetyInput - The input type for the scanUrlSafety function.
 * - ScanUrlSafetyOutput - The return type for the scanUrlSafety function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScanUrlSafetyInputSchema = z.object({
  url: z
    .string()
    .url("Please enter a valid URL.")
    .describe("The URL to analyze for safety risks."),
});
export type ScanUrlSafetyInput = z.infer<typeof ScanUrlSafetyInputSchema>;

const ScanUrlSafetyOutputSchema = z.object({
  riskLevel: z.enum(['SAFE', 'WARNING', 'DO_NOT_OPEN']).describe("The calculated risk level for the URL."),
  explanation: z
    .string()
    .describe('A simplified, step-by-step explanation of why the URL was flagged with that risk level. Use simple language and provide actionable advice.'),
  checks: z.array(z.object({
    name: z.string().describe("The name of the safety check performed."),
    passed: z.boolean().describe("Whether the URL passed the check."),
  })).describe("A list of simulated checks performed on the URL."),
});
export type ScanUrlSafetyOutput = z.infer<typeof ScanUrlSafetyOutputSchema>;

export async function scanUrlSafety(input: ScanUrlSafetyInput): Promise<ScanUrlSafetyOutput> {
  return scanUrlSafetyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scanUrlSafetyPrompt',
  input: {schema: ScanUrlSafetyInputSchema},
  output: {schema: ScanUrlSafetyOutputSchema},
  prompt: `You are a URL safety analysis expert. You are analyzing a URL for a non-technical user in India.

  IMPORTANT: You do not have access to real-time scanning tools. You must SIMULATE a response based on common patterns.
  
  Analyze the following URL: {{{url}}}

  Simulate a safety analysis based on these fictional rules:
  - If the URL is from a well-known, reputable domain (e.g., google.com, sbi.co.in, gov.in), assign 'SAFE'.
  - If the URL uses a URL shortener (e.g., bit.ly, tinyurl), assign 'WARNING' and advise caution as the final destination is hidden.
  - If the URL contains suspicious keywords (e.g., 'login', 'verify', 'account') combined with a non-standard domain, assign 'WARNING' or 'DO_NOT_OPEN'.
  - If the domain name is intentionally misspelled to impersonate a known brand (e.g., 'g00gle.com', 'sbi-bank.info'), assign 'DO_NOT_OPEN' and flag it as phishing.
  - If the URL uses HTTP instead of HTTPS, assign 'WARNING' and note that the connection is not secure.
  - If the URL has an unusual top-level domain for a common service (e.g., '.xyz', '.club' for a bank), assign 'WARNING'.

  Your response must include:
  1.  **riskLevel**: 'SAFE', 'WARNING', or 'DO_NOT_OPEN'.
  2.  **explanation**: A simple, clear reason for the risk level. Provide actionable advice like "This link seems safe to open," "Proceed with caution," or "Do not open this link. It may be a phishing attempt."
  3.  **checks**: A list of 2-3 simulated checks performed, e.g., { name: "Phishing Detected", passed: false }, { name: "Uses HTTPS", passed: true }, { name: "Known Domain", passed: true }.

  Generate a plausible but clearly simulated response for the user.`,
});

const scanUrlSafetyFlow = ai.defineFlow(
  {
    name: 'scanUrlSafetyFlow',
    inputSchema: ScanUrlSafetyInputSchema,
    outputSchema: ScanUrlSafetyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
