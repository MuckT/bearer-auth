'use strict'

const supertest = require('supertest')
const { server } = require('../../../src/server')
const mockRequest = supertest(server)

describe('Given /bad', () => {
  describe('When GET', () => {
    it('Then returns 500 status', async () => {
      const response = await mockRequest.get('/bad')
      expect(response.status).toStrictEqual(500)
    })

    it('Then returns correct error object', async () => {
      const response = await mockRequest.get('/bad')
      expect(response.body).toStrictEqual(
        {
          error: "you've messed up",
        }
      )
    })
  })
})
