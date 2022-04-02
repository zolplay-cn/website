import * as request from 'supertest'

import { AppModule } from '~/app.module'

import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

describe('AppResolver (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('version (Query)', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{ version }',
      })
      .expect({
        data: {
          version: '1.0.0',
        },
      })
  })
})
