import * as prompt from 'prompt';
import { SortField, SortOrder, UserRecord } from './common';
import { encodeRecord, parseRecord, readRecordFile, sortRecords } from './utils';

export class PromptService {
  private promptSchema = {
    properties: {
      files: {
        description: 'Input file names separated by space',
        required: true,
      },
    },
  };
  private sortOptions = [
    [{ field: SortField.LAST_NAME, order: SortOrder.ASC }, { field: SortField.GENDER, order: SortOrder.ASC }],
    [{ field: SortField.DOB, order: SortOrder.ASC }],
    [{ field: SortField.LAST_NAME, order: SortOrder.DESC }],
  ];

  constructor() {}

  /**
   * Get prompt, input files
   */
  async getPrompt() {
    prompt.start();
    prompt.get(this.promptSchema, async (err, result) => {
      // get inputted file names
      const filenames = result.files.toString().split(' ');
      let allRecords: Array<string> = [];
      // read files from `src/assets/`
      await Promise.all(filenames.map(async (filename) => {
        const records = await readRecordFile(filename);
        allRecords = [...allRecords, ...records];
      }));
      // parse records
      const userRecords: UserRecord[] = allRecords.reduce((pre, record) => ([
        ...pre,
        parseRecord(record),
      ]), []);
      // sort records, print
      this.sortOptions.map((options, index) => {
        console.log(`=== Output ${index + 1}, sorted by ${options[0].field} ===`);

        const sorted = options.reduce((pre, option) => {
          return sortRecords(pre, option.field, option.order);
        }, userRecords);

        sorted.forEach((record) => {
          console.log(encodeRecord(record));
        });
        console.log('\n');
      });
    });
  }
}
