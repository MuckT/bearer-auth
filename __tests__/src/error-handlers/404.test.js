'use strict'

const supertest = require('supertest')
const { server } = require('../../../src/server')
const mockRequest = supertest(server)

describe('Given /iDoNotExist', () => {
  describe('When GET', () => {
    it('Then returns 404 status', async  () => {
      const response = await mockRequest.get('/iDoNotExist')
      expect(response.status).toStrictEqual(404)
    })
  })

  describe('When POST', () => {
    it('Then returns 404 status', async  () => {
      const response = await mockRequest.post('/iDoNotExist')
      expect(response.status).toStrictEqual(404)
    })
  })
})
