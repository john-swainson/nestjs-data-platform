import { RecordsService } from './records.service';

describe('Test records service', () => {
  let recordsService: RecordsService;

  beforeEach(() => {
    recordsService = new RecordsService();
  });

  it('should be defined', () => {
    expect(recordsService).toBeDefined();
  });

  it('should create record', () => {
    const rawRecord = 'Fogel | Mike | MALE | Yello | 12-09-1980';
    const record = recordsService.createRecord(rawRecord);
    expect(record).toMatchObject({
      lastName: "Fogel",
      firstName: "Mike",
      gender: "MALE",
      favoriteColor: "Yello",
      dateOfBirth: "12/9/1980",
    });
    expect(recordsService.records.length).toBe(1);
  });

  it('should map record results', () => {
    const rawRecord = 'Fogel | Mike | MALE | Yello | 12-09-1980';
    recordsService.createRecord(rawRecord);
    const mappedRecords = recordsService.mapRecordResult(recordsService.records);

    expect(mappedRecords.length).toBe(1);
    expect(mappedRecords).toMatchObject([
      {
        lastName: "Fogel",
        firstName: "Mike",
        gender: "MALE",
        favoriteColor: "Yello",
        dateOfBirth: "12/9/1980",
      },
    ]);
  });

  describe('Test sorted records', () => {
    beforeEach(() => {
      recordsService.createRecord('Marshall, Michael, MALE, Green, 09-22-1982');
      recordsService.createRecord('Fogel | Mike | MALE | Yello | 12-09-1980');
      recordsService.createRecord('Knowles, Teresa, FEMALE, Pink, 01-22-1994');
      expect(recordsService.records.length).toBe(3);
    });

    it('should sort records by gender', () => {
      const sorted = recordsService.sortByGender();
      expect(sorted.length).toBe(3);
      expect(sorted.map((r) => r.gender)).toStrictEqual(['FEMALE', 'MALE', 'MALE']);
    });

    it('should sort records by birthdate', () => {
      const sorted = recordsService.sortByBirthdate();
      expect(sorted.length).toBe(3);
      expect(sorted.map((r) => r.lastName)).toStrictEqual(['Fogel', 'Marshall', 'Knowles']);
    });

    it('should sort records by name', () => {
      const sorted = recordsService.sortByName();
      expect(sorted.length).toBe(3);
      expect(sorted.map((r) => r.lastName)).toStrictEqual(['Fogel', 'Knowles', 'Marshall']);
    });
  });
});
