import { NotFoundError } from '../errors'
import { RepositoryAbstract } from './repository.abstract'
import { SearchInput, SearchOutput } from './search'

export type ModelProps = {
  id?: string
  [key: string]: any
}

export type CreateProps = {
  [key: string]: any
}

export abstract class InMemoryRepository<
  Entity extends ModelProps,
> implements RepositoryAbstract<Entity, CreateProps> {
  items: Entity[] = []
  sortableFields: string[] = []

  async findById(id: string): Promise<Entity | null> {
    return this._get(id)
  }
  async newEntity(props: CreateProps): Entity {
    throw new Error('Method not implemented.')
  }
  async save(entity: Entiry): Promise<Entiry> {
    throw new Error('Method not implemented.')
  }
  async delete(entity: Entiry): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async search(params: SearchInput): Promise<SearchOutput<Entiry>> {
    throw new Error('Method not implemented.')
  }
  protected async _get(id: string): Promise<Entity> {
    const entity = this.items.find(item => item.id === id)
    if (!entity) {
      throw new NotFoundError(`Entity not found uning id ${id}`)
    }
    return entity
  }
}
