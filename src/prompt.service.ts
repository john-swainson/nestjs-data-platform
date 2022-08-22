import * as prompt from 'prompt';
import { Logger } from '@nestjs/common';

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
  getPrompt() {
    prompt.start();
    prompt.get(this.promptSchema, (err, result) => {
      const fileNames = result.files.toString().split(' ');
      console.log(fileNames)
    });
  }
}
