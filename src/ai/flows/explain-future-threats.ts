'use server';
/**
 * @fileOverview Explains future cybersecurity threats using AI.
 *
 * - explainFutureThreats - A function that explains future threats in simple terms.
 * - ExplainFutureThreatsInput - The input type for the explainFutureThreats function.
 * - ExplainFutureThreatsOutput - The return type for the explainFutureThreats function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainFutureThreatsInputSchema = z.object({
  threat: z
    .string()
    .describe("The future cybersecurity threat to explain (e.g., AI-based attacks, deepfakes, large-scale data breaches)."),
});
export type ExplainFutureThreatsInput = z.infer<typeof ExplainFutureThreatsInputSchema>;

const ExplainFutureThreatsOutputSchema = z.object({
  explanation: z
    .string()
    .describe('A simplified explanation of the future cybersecurity threat.'),
});
export type ExplainFutureThreatsOutput = z.infer<typeof ExplainFutureThreatsOutputSchema>;

export async function explainFutureThreats(input: ExplainFutureThreatsInput): Promise<ExplainFutureThreatsOutput> {
  return explainFutureThreatsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainFutureThreatsPrompt',
  input: {schema: ExplainFutureThreatsInputSchema},
  output: {schema: ExplainFutureThreatsOutputSchema},
  prompt: `You are an expert in cybersecurity, skilled at explaining complex topics in simple terms for a non-technical audience.

  Explain the following future cybersecurity threat in a way that students, families, and seniors can easily understand. Avoid jargon and provide practical examples.

  Threat: {{{threat}}}`,
});

const explainFutureThreatsFlow = ai.defineFlow(
  {
    name: 'explainFutureThreatsFlow',
    inputSchema: ExplainFutureThreatsInputSchema,
    outputSchema: ExplainFutureThreatsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
