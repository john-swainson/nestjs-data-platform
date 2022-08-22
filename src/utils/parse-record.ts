import { Gender, UserRecord } from '../common';

export const parseRecord = (record: string): UserRecord => {
  let delimiter = ' ';
  if (record.includes('|')) {
    delimiter = ' | ';
  } else if (record.includes(',')) {
    delimiter = ', ';
  }

  const items = record.split(delimiter);
  return {
    lastName: items[0],
    firstName: items[1],
    gender: items[2] as Gender,
    favoriteColor: items[3],
    dob: new Date(items[4]),
  };
};
