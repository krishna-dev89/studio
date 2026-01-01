'use server';
/**
 * @fileOverview A tool to simulate locating a phone number.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// A simple map to simulate location lookups based on area codes.
const areaCodeLocations: Record<string, string> = {
  '984': 'Delhi NCR',
  '981': 'Mumbai, MH',
  '982': 'Mumbai, MH',
  '989': 'Mumbai, MH',
  '983': 'Kolkata, WB',
  '987': 'Punjab',
  '988': 'Punjab',
  '986': 'Chennai, TN',
  '985': 'Uttar Pradesh (East)',
  '944': 'Kerala',
  '994': 'Tamil Nadu (except Chennai)',
  '950': 'Andhra Pradesh',
};

export const locatePhoneNumberTool = ai.defineTool(
  {
    name: 'locatePhoneNumber',
    description: 'Simulates looking up the geographical location (city, state) of a given Indian phone number based on its prefix.',
    inputSchema: z.object({
      phoneNumber: z.string().describe('The phone number to locate.'),
    }),
    outputSchema: z.object({
      location: z.string().describe('The simulated location, e.g., "Delhi NCR".'),
    }),
  },
  async ({ phoneNumber }) => {
    // Remove '+91' or '0' prefix
    const normalizedNumber = phoneNumber.replace(/^\+91|^0/, '');

    // Check first 3 digits
    const prefix = normalizedNumber.substring(0, 3);

    const location = areaCodeLocations[prefix] || 'Unknown Location';

    return { location };
  }
);
