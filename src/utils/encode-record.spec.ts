import { Gender, UserRecord } from '../common';
import { encodeRecord } from './encode-record';

describe('Test encodeRecord', () => {
  it('should be defined', () => {
    expect(encodeRecord).toBeDefined();
  });

  it('should encode record', () => {
    const record: UserRecord = {
      lastName: "Fogel",
      firstName: "Mike",
      gender: Gender.MALE,
      favoriteColor: "Yello",
      dob: new Date('12-09-1980'),
    };
    const encoded = encodeRecord(record);
    expect(encoded).toBe('Fogel, Mike, MALE, Yello, 12/9/1980');
  });
});
