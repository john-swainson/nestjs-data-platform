import * as prompt from 'prompt';
import { readRecordFile } from './utils';

export class PromptService {
  private promptSchema = {
    properties: {
      files: {
        description: 'Input file names separated by space',
        required: true,
      },
    },
  };

  constructor() {}

  /**
   * Get prompt, input files
   */
  async getPrompt() {
    prompt.start();
    prompt.get(this.promptSchema, (err, result) => {
      const filenames = result.files.toString().split(' ');
      Promise.all(filenames.map(async (filename) => {
        await readRecordFile(filename);
      }));
    });
  }
}
