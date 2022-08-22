import { Test } from '@nestjs/testing';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';

describe('Test records controller', () => {
  let recordsController: RecordsController;
  let recordsService: RecordsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RecordsController],
      providers: [RecordsService],
    }).compile();

    recordsController = moduleRef.get<RecordsController>(RecordsController);
    recordsService = moduleRef.get<RecordsService>(RecordsService);
  });

  it('should be defined', () => {
    expect(recordsController).toBeDefined();
  });

  it('should create record', () => {
    const rawRecord = 'Fogel | Mike | MALE | Yello | 12-09-1980';
    const record = recordsController.createRecord({ record: rawRecord });
    expect(record).toMatchObject({
      lastName: "Fogel",
      firstName: "Mike",
      gender: "MALE",
      favoriteColor: "Yello",
      dateOfBirth: "12/9/1980",
    });
  });

  it('should sort by gender', () => {
    const serviceSpy = jest
      .spyOn(recordsService, 'sortByGender')
      .mockImplementation(() => []);
    expect(recordsController.sortByGender()).toStrictEqual([]);
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  it('should sort by birthdate', () => {
    const serviceSpy = jest
      .spyOn(recordsService, 'sortByBirthdate')
      .mockImplementation(() => []);
    expect(recordsController.sortByBirthDate()).toStrictEqual([]);
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  it('should sort by gender', () => {
    const serviceSpy = jest
      .spyOn(recordsService, 'sortByName')
      .mockImplementation(() => []);
    expect(recordsController.sortByName()).toStrictEqual([]);
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });
});
