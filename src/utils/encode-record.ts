import { UserRecord } from '../common';

export const encodeRecord = (record: UserRecord): string => {
  return [
    record.lastName,
    record.firstName,
    record.gender,
    record.favoriteColor,
    record.dob.toLocaleDateString("en-US"),
  ].join(', ');
};
