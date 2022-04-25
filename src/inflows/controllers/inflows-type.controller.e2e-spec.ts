
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  const getListOfNames = () => {
    const names = [];
    for(let i = 0; i<100; i++){
      names.push("name In inflowtype " + i);
    }
    return names;
  };
  it('/ (POST) Should create al 100 items of Inflow type', () => {
    getListOfNames().forEach(name => {
      request(app.getHttpServer())
        .post('/')
        .send({ name })
        .expect(200)
        .expect({ name });

    })
  });
});
