'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/explain-future-threats.ts';
import '@/ai/flows/analyze-message.ts';
import '@/ai/flows/check-phone-risk.ts';
