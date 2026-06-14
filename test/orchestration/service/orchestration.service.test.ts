import { describe, it, expect } from 'vitest';
import { OrchestrationService } from '../../../src/tools/orchestration/service/orchestration.service.js';
import {
  PLANNING_PROMPT,
  TESTING_PROMPT,
  CODE_REVIEW_PROMPT,
  VERIFICATION_PROMPT,
  GIT_SYSTEM_PROMPT,
  SENIOR_SWE_ORCHESTRATION_PROMPT,
} from '../../../src/tools/orchestration/prompts/index.js';

describe('Orchestration Service', () => {
  const service = new OrchestrationService();

  describe('getOrchestrationPhase', () => {
    it('should return PLANNING_PROMPT for phase 1', () => {
      const result = service.getOrchestrationPhase(1, true);
      expect(result.instructions).toContain(PLANNING_PROMPT.replace('{{phase}}', '1'));
    });

    it('should return TESTING_PROMPT for phase 3 when includeTest is true', () => {
      const result = service.getOrchestrationPhase(3, true);
      expect(result.instructions).toContain(TESTING_PROMPT.replace('{{phase}}', '3'));
    });

    it('should return CODE_REVIEW_PROMPT for phase 4 when includeTest is true', () => {
      const result = service.getOrchestrationPhase(4, true);
      expect(result.instructions).toContain(CODE_REVIEW_PROMPT.replace('{{phase}}', '4'));
    });

    it('should return CODE_REVIEW_PROMPT for phase 3 when includeTest is false', () => {
      const result = service.getOrchestrationPhase(3, false);
      expect(result.instructions).toContain(CODE_REVIEW_PROMPT.replace('{{phase}}', '3'));
    });

    it('should return VERIFICATION_PROMPT for phase 4 when includeTest is false', () => {
      const result = service.getOrchestrationPhase(4, false);
      expect(result.instructions).toContain(VERIFICATION_PROMPT.replace('{{phase}}', '4'));
    });

    it('should return GIT_SYSTEM_PROMPT for phase 5 when includeTest is false', () => {
      const result = service.getOrchestrationPhase(5, false);
      expect(result.instructions).toContain(GIT_SYSTEM_PROMPT.replace('{{phase}}', '5'));
    });

    it('should return error for invalid phase (e.g. 7 with includeTest true)', () => {
      const result = service.getOrchestrationPhase(7, true);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Invalid phase number');
    });

    it('should return error for phase 6 when includeTest is false', () => {
      const result = service.getOrchestrationPhase(6, false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('tests skipped');
    });
  });

  describe('getOrchestrationPrompt', () => {
    it('should replace {{context}} with the provided command', () => {
      const commandText = 'Implement feature X';
      const result = service.getOrchestrationPrompt(commandText);
      const expectedText = SENIOR_SWE_ORCHESTRATION_PROMPT.replace('{{context}}', commandText);

      expect(result).toBe(expectedText);
    });

    it('should handle undefined command gracefully', () => {
      const result = service.getOrchestrationPrompt();
      const expectedText = SENIOR_SWE_ORCHESTRATION_PROMPT.replace('{{context}}', 'No specific command provided.');

      expect(result).toBe(expectedText);
    });
  });
});
