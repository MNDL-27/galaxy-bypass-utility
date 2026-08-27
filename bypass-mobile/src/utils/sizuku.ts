export interface CommandResult {
  code: number;
  stdout: string;
  stderr: string;
}

/**
 * Placeholder for Sizuku shell execution interface.
 * Will be backed by Sizuku native module or command bridge.
 */
export async function execCommand(command: string): Promise<CommandResult> {
  // Placeholder implementation
  return {
    code: 0,
    stdout: '',
    stderr: '',
  };
}
