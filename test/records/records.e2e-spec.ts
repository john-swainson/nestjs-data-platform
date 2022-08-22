import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';

describe('records endpoints', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('POST /records - create record', () => {
    it('should validate body', () => {
      return request(app.getHttpServer())
        .post('/records')
        .send({ record: 123 })
        .expect(400, {
          statusCode: 400,
          message: ["record must be a string"],
          error: 'Bad Request',
        });
    });

    it('should create record', () => {
      return request(app.getHttpServer())
        .post('/records')
        .send({ record: 'Fogel | Mike | MALE | Yello | 12-09-1980' })
        .expect((res) => {
          expect(res.status).toBe(201);
          expect(res.body).toMatchObject({
            lastName: "Fogel",
            firstName: "Mike",
            gender: "MALE",
            favoriteColor: "Yello",
            dateOfBirth: "12/9/1980",
          });
        });
    });
  });

  describe('GET sorted records', () => {
    beforeEach(async () => {
      // mock records
      await request(app.getHttpServer()).post('/records').send({ record: 'Marshall, Michael, MALE, Green, 09-22-1982' });
      await request(app.getHttpServer()).post('/records').send({ record: 'Knowles, Teresa, FEMALE, Pink, 01-22-1994' });
      await request(app.getHttpServer()).post('/records').send({ record: 'Fogel | Mike | MALE | Yello | 12-09-1980' });
    });

    it('GET /records/gender - sorted by gender', () => {
      return request(app.getHttpServer())
        .get('/records/gender')
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(res.body.length).toBe(3);
          expect(res.body.map((r) => r.gender)).toStrictEqual(['FEMALE', 'MALE', 'MALE']);
        });
    });

    it('GET /records/birthdate - sorted by birthdate', () => {
      return request(app.getHttpServer())
        .get('/records/birthdate')
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(res.body.length).toBe(3);
          expect(res.body.map((r) => r.lastName)).toStrictEqual(['Fogel', 'Marshall', 'Knowles']);
        });
    });

    it('GET /records/name - sorted by name', () => {
      return request(app.getHttpServer())
        .get('/records/name')
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(res.body.length).toBe(3);
          expect(res.body.map((r) => r.lastName)).toStrictEqual(['Fogel', 'Knowles', 'Marshall']);
        });
    });
  });
});
