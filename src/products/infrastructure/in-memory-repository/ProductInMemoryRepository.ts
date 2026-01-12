import { InMemoryRepository } from '@/common/domain/repositories/in-memory.repository'
import { ProductModel } from '@/products/domain/models/products.model'
import {
  ProductId,
  ProductRepository,
} from '@/products/domain/repositories/ProductRespository'
import { ProductEntity } from '../typeorm/entities/product.entity'
import { ConflictError, ErrorCode, NotFoundError } from '@/common'

export class ProductInMemoryRepository
  extends InMemoryRepository<ProductEntity>
  implements ProductRepository
{
  protected sortableFields: (keyof ProductEntity)[] = ['name', 'createdAt']

  async findByName(name: string): Promise<ProductModel> {
    const product = this.items.find(item => item.name === name)
    if (!product) {
      throw new NotFoundError(`${ErrorCode.NOT_FOUND} name ${name}`)
    }
    return product
  }
  async findAllByIds(productIds: ProductId[]): Promise<ProductModel[]> {
    // Converte os IDs para um Set para busca eficiente
    const ids = new Set(productIds.map(productId => productId.id))

    // Filtra apenas os produtos existentes
    return this.items.filter(item => ids.has(item.id))
  }
  async conflictngName(name: string): Promise<void> {
    const product = this.items.find(item => item.name === name)
    if (product) {
      throw new ConflictError(ErrorCode.CONFLICT_ERROR)
    }
  }
  protected async applyFilter(
    items: ProductEntity[],
    filter?: string,
  ): Promise<ProductEntity[]> {
    if (!filter) return items
    return items.filter(item =>
      item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    )
  }

  protected async applySort(
    items: ProductEntity[],
    sortBy?: keyof ProductEntity | undefined,
    sortDirection?: 'asc' | 'desc',
  ): Promise<ProductEntity[]> {
    return super.applySort(
      items,
      sortBy ?? 'createdAt',
      sortDirection ?? 'desc',
    )
  }
}
