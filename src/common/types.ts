import { Gender } from './enums';

export type UserRecord = {
  firstName: string;
  lastName: string;
  gender: Gender;
  favoriteColor: string;
  dob: Date;
};
