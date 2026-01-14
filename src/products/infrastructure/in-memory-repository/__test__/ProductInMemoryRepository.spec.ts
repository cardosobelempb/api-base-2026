import { ConflictError, ErrorCode, NotFoundError } from '@/common'
import { beforeEach, describe, expect, it } from 'vitest'
import { productBuild } from '../../testing/productBuild'
import { ProductInMemoryRepository } from '../ProductInMemoryRepository'

describe('ProductInmemoryRepository unit tests', () => {
  let sut: ProductInMemoryRepository

  beforeEach(() => {
    sut = new ProductInMemoryRepository()
  })

  describe('findByName', () => {
    it('should throw error when id not found', async () => {
      await sut.findByName('fake_name').catch(err => {
        expect(err).toBeInstanceOf(NotFoundError)
        expect(err.path).toBe(`${ErrorCode.NOT_FOUND} fake_name`)
        expect(err.statusCode).toBe(404)
      })
    })

    it('should find a product by name', async () => {
      const data = productBuild({
        name: 'Curso nodejs',
      })
      const product = await sut.save(data)
      const result = await sut.findByName(product.name)
      expect(result).toBeDefined()
      expect(result).toStrictEqual(data)
      expect(result.name).toStrictEqual(data.name)
    })
  })

  describe('conflictngName', async () => {
    it('should throw error when id not found', async () => {
      const data = productBuild({
        name: 'Curso nodejs',
      })

      sut['items'].push(data)
      await sut.conflictngName('Curso nodejs').catch(err => {
        expect(err).toBeInstanceOf(ConflictError)
        expect(err.path).toBe(`${ErrorCode.CONFLICT_ERROR} ${data.name}`)
        expect(err.statusCode).toBe(409)
      })
    })

    it('should not find a product by name', async () => {
      expect.assertions(0)
      await sut.conflictngName('Curso nodejs')
    })
  })
})
