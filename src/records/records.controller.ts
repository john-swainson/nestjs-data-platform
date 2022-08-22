import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordDto } from './dto/record.dto';
import { RecordsService } from './records.service';

@Controller()
export class RecordsController {
  constructor(
    private readonly recordsService: RecordsService,
  ) { }
  
  @Post('')
  public createRecord(@Body() recordDto: CreateRecordDto) {
    return this.recordsService.createRecord(recordDto.record);
  }

  @Get('/gender')
  public sortByGender(): Array<RecordDto> {
    return this.recordsService.sortByGender();
  }

  @Get('/birthdate')
  public sortByBirthDate(): Array<RecordDto> {
    return this.recordsService.sortByBirthdate();
  }

  @Get('/name')
  public sortByName(): Array<RecordDto> {
    return this.recordsService.sortByName();
  }
}
