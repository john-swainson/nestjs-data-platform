import { IsString } from 'class-validator';

export class CreateRecordDto {
  @IsString()
  public readonly record: string;
}
