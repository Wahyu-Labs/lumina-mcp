import {
  SENIOR_SWE_ORCHESTRATION_PROMPT,
  PLANNING_PROMPT,
  EXECUTION_PROMPT,
  TESTING_PROMPT,
  CODE_REVIEW_PROMPT,
  VERIFICATION_PROMPT,
  GIT_SYSTEM_PROMPT,
} from '../prompts/index.js';

export class OrchestrationService {
  /**
   * Returns the dynamic instructions for a specific orchestration phase.
   *
   * @param phase The phase number requested.
   * @param includeTest Whether tests are included in the workflow.
   * @returns An object containing either the instructions string or an error message.
   */
  public getOrchestrationPhase(phase: number, includeTest: boolean): { instructions?: string; error?: string } {
    let instructions = '';

    if (includeTest) {
      // Full workflow (6 phases)
      switch (phase) {
        case 1:
          instructions = PLANNING_PROMPT;
          break;
        case 2:
          instructions = EXECUTION_PROMPT;
          break;
        case 3:
          instructions = TESTING_PROMPT;
          break;
        case 4:
          instructions = CODE_REVIEW_PROMPT;
          break;
        case 5:
          instructions = VERIFICATION_PROMPT;
          break;
        case 6:
          instructions = GIT_SYSTEM_PROMPT;
          break;
        default:
          return { error: 'Invalid phase number. Please request a phase between 1 and 6.' };
      }
    } else {
      // Skip testing (5 phases)
      switch (phase) {
        case 1:
          instructions = PLANNING_PROMPT;
          break;
        case 2:
          instructions = EXECUTION_PROMPT;
          break;
        case 3:
          instructions = CODE_REVIEW_PROMPT;
          break;
        case 4:
          instructions = VERIFICATION_PROMPT;
          break;
        case 5:
          instructions = GIT_SYSTEM_PROMPT;
          break;
        default:
          return { error: 'Invalid phase number. Please request a phase between 1 and 5 (tests skipped).' };
      }
    }

    // Dynamically replace the phase number placeholder
    instructions = instructions.replace(/\{\{phase\}\}/g, String(phase));

    return { instructions };
  }

  /**
   * Returns the senior SWE orchestration base prompt injected with context.
   *
   * @param command The context or command provided by the user.
   * @returns The evaluated prompt text.
   */
  public getOrchestrationPrompt(command?: string): string {
    const context = command || 'No specific command provided.';
    return SENIOR_SWE_ORCHESTRATION_PROMPT.replace('{{context}}', context);
  }
}
