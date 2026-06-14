import { z } from 'zod';

export const OrchestrationPromptSchema = {
  command: z.string().optional().describe('General instructions or context for the orchestration'),
};

export const GetOrchestrationPhaseSchema = {
  phase: z.number().min(1).max(6).describe('The phase number to get instructions for'),
  includeTest: z.boolean().describe('Whether tests are included in this orchestration'),
};

