import { Gender } from '../common';
import { parseRecord } from './parse-record';

describe('Test parseRecord', () => {
  it('should be defined', () => {
    expect(parseRecord).toBeDefined();
  });

  it('should parse pipe-delimited record', () => {
    const rawRecord = 'Fogel | Mike | MALE | Yello | 12-09-1980';
    const userRecord = parseRecord(rawRecord);
    expect(userRecord).toMatchObject({
      lastName: "Fogel",
      firstName: "Mike",
      gender: Gender.MALE,
      favoriteColor: "Yello",
      dob: new Date('12-09-1980'),
    });
  });

  it('should parse comma-delimited record', () => {
    const rawRecord = 'Marshall, Michael, MALE, Green, 09-22-1982';
    const userRecord = parseRecord(rawRecord);
    expect(userRecord).toMatchObject({
      lastName: "Marshall",
      firstName: "Michael",
      gender: Gender.MALE,
      favoriteColor: "Green",
      dob: new Date('09-22-1982'),
    });
  });

  it('should parse space-delimited record', () => {
    const rawRecord = 'Walker Eric MALE Orange 05-17-1991';
    const userRecord = parseRecord(rawRecord);
    expect(userRecord).toMatchObject({
      lastName: "Walker",
      firstName: "Eric",
      gender: Gender.MALE,
      favoriteColor: "Orange",
      dob: new Date('05-17-1991'),
    });
  });
});
