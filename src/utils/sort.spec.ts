import { Gender, SortField, SortOrder, UserRecord } from '../common';
import { sortRecords } from './sort';

describe('Test sortRecords', () => {
  const mockedRecords: Array<UserRecord> = [
    {
      lastName: "Marshall",
      firstName: "Michael",
      gender: Gender.MALE,
      favoriteColor: "Green",
      dob: new Date('09-22-1982'),
    },
    {
      lastName: "Fogel",
      firstName: "Mike",
      gender: Gender.MALE,
      favoriteColor: "Yello",
      dob: new Date('12-09-1980'),
    },
    {
      lastName: "Knowles",
      firstName: "Teresa",
      gender: Gender.FEMALE,
      favoriteColor: "Pink",
      dob: new Date('01-22-1994'),
    },
  ];
  it('should be defined', () => {
    expect(sortRecords).toBeDefined();
  });

  it('should sort by gender', () => {
    const sorted = sortRecords(mockedRecords, SortField.GENDER, SortOrder.ASC);
    expect(sorted.map((r) => r.gender)).toStrictEqual(['FEMALE', 'MALE', 'MALE']);
  });

  it('should sort by birthdate', () => {
    const sorted = sortRecords(mockedRecords, SortField.DOB, SortOrder.ASC);
    expect(sorted.map((r) => r.lastName)).toStrictEqual(['Fogel', 'Marshall', 'Knowles']);
  });

  it('should sort by name', () => {
    const sorted = sortRecords(mockedRecords, SortField.LAST_NAME, SortOrder.ASC);
    expect(sorted.map((r) => r.lastName)).toStrictEqual(['Fogel', 'Knowles', 'Marshall']);
  });
});
