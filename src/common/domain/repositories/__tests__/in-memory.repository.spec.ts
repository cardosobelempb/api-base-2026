import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryRepository } from '../in-memory.repository'
import { randomUUID } from 'node:crypto'
import { NotFoundError } from '../../errors'

type StubEntity = {
  id: string
  name: string
  price: number
  createdAt: Date
  updatedAt: Date
  deletedAt: null
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {
  constructor() {
    super()
    this.sortableFields = ['name']
  }
  protected async applyFilter(
    items: StubEntity[],
    filter?: string,
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items
    }

    return items.filter(
      item => item.name.toLowerCase().includes(filter.toLowerCase()), // exemplo
    )
  }
}

describe('InmemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository
  let entity: StubEntity
  let props: any
  let createdAt: Date
  let updatedAt: Date
  let deletedAt: null

  beforeEach(() => {
    sut = new StubInMemoryRepository()
    createdAt = new Date()
    updatedAt = new Date()
    deletedAt = null

    props = {
      name: 'test name',
      price: 10,
    }

    entity = {
      id: randomUUID(),
      createdAt,
      updatedAt,
      deletedAt,
      ...props,
    }
  })

  it('should create a new entity', () => {
    const result = sut.newEntity(props)
    expect(result.name).toStrictEqual('test name')
  })

  it('should insert a new entity', async () => {
    /**
      await sut.save(props)
      const result = await sut.findById(entity.id)
      expect(result).toBeDefined()
    */

    entity = await sut.save(props)
    const result = await sut.search({ filter: 'test name' })

    expect(result.items).toHaveLength(1)
    expect(result.items[0]?.name).toBe('test name')
    expect(result.items[0]).toStrictEqual(entity)
  })

  it('should throw error when id not found', async () => {
    const id = randomUUID()
    await sut['_get'](id).catch(err => {
      expect(err).toBeInstanceOf(NotFoundError)
      expect(err.path).toBe(`Entity not found using id ${id}`)
      expect(err.statusCode).toBe(404)
    })
  })

  it('should find a entity by id', async () => {
    const data = await sut.save(props)
    const result = await sut.findById(data.id)
    expect(result).toBeDefined()
    expect(result).toStrictEqual(data)
  })

  it('should throw error when id not found', async () => {
    await sut['save'](entity).catch(err => {
      expect(err).toBeInstanceOf(NotFoundError)
      expect(err.path).toBe(`Entity not found using id ${entity.id}`)
      expect(err.statusCode).toBe(404)
    })
  })

  it('should update an entity', async () => {
    entity = await sut.save(props)
    const entityUpdated = {
      id: entity.id,
      name: 'updated name',
      price: 2000,
      createdAt,
      updatedAt,
      deletedAt: null,
    }
    entity = await sut.save(entityUpdated)

    const result = await sut.search({ filter: 'updated name' })

    expect(result.items).toHaveLength(1)
    expect(result.items[0]?.name).toBe('updated name')
    expect(result.items[0]).toStrictEqual(entity)
  })

  it('should throw error when id not found delete', async () => {
    await sut['delete'](entity).catch(err => {
      expect(err).toBeInstanceOf(NotFoundError)
      expect(err.path).toBe(`Entity not found using id ${entity.id}`)
      expect(err.statusCode).toBe(404)
    })
  })

  it('should delete an entity', async () => {
    const data = await sut.save(props)
    const result = await sut.search({ filter: 'test name' })

    expect(result.items).toHaveLength(1)
    await sut.delete(data)

    // expect(result.items.length).toBe(0)
    expect(result.items[0]?.deletedAt).toBeDefined()
    expect(result.items[0]?.deletedAt).toEqual(expect.any(Date))
    expect(result.items).toHaveLength(1)
    expect(result.items[0]?.name).toBe('test name')
    expect(result.items[0]).toStrictEqual(data)
  })
})
