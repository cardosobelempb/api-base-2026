import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryRepository } from '../in-memory.repository'
import { randomUUID } from 'node:crypto'

type StubEntity = {
  id: string
  name: string
  price: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
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
  let deletedAt: Date

  beforeEach(() => {
    sut = new StubInMemoryRepository()
    createdAt = new Date()
    updatedAt = new Date()
    deletedAt = new Date()

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

  it('should find by id', async () => {
    await sut.save(props)
    const result = await sut.findById(entity.id)
    expect(result).toBeDefined()
  })
})
