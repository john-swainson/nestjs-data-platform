import { Injectable } from '@nestjs/common';
import { SortField, SortOrder, UserRecord } from '../common';
import { parseRecord, sortRecords } from '../utils';
import { RecordDto } from './dto/record.dto';

@Injectable()
export class RecordsService {
  private records: Array<UserRecord>;
  constructor() {
    this.records = [];
  }

  public createRecord(record: string): RecordDto {
    const userRecord = parseRecord(record);
    this.records = [...this.records, userRecord];
    return {
      ...userRecord,
      dateOfBirth: userRecord.dob.toLocaleDateString("en-US"),
    };
  }

  public sortByGender(): Array<RecordDto> {
    const result = sortRecords(this.records, SortField.GENDER, SortOrder.ASC);
    return this.mapRecordResult(result);

  }

  public sortByBirthdate(): Array<RecordDto> {
    const result = sortRecords(this.records, SortField.DOB, SortOrder.ASC);
    return this.mapRecordResult(result);
  }

  public sortByName(): Array<RecordDto> {
    const result = sortRecords(this.records, SortField.LAST_NAME, SortOrder.ASC);
    return this.mapRecordResult(result);
  }

  public mapRecordResult(records: Array<UserRecord>): Array<RecordDto> {
    return records.map((record) => ({
      ...record,
      dateOfBirth: record.dob.toLocaleDateString("en-US"),
    }));
  }
}
