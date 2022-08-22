import { IsString } from 'class-validator';
import { Gender } from '../../common';

export class RecordDto {
  @IsString()
  public readonly lastName: string;

  @IsString()
  public readonly firstName: string;

  @IsString()
  public readonly gender: Gender;

  @IsString()
  public readonly favoriteColor: string;

  @IsString()
  public readonly dateOfBirth: string;
}
