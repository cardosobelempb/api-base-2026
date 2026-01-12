import { InMemoryRepository } from '@/common/domain/repositories/in-memory.repository'

import {
  ProductId,
  ProductRepository,
} from '@/products/domain/repositories/ProductRespository'

import { ConflictError, ErrorCode, NotFoundError } from '@/common'
import { ProductProps } from '@/products/domain/entities/product.entity'

export class ProductInMemoryRepository
  extends InMemoryRepository<ProductProps>
  implements ProductRepository
{
  protected sortableFields: (keyof ProductProps)[] = ['name', 'createdAt']

  async findByName(name: string): Promise<ProductProps> {
    const product = this.items.find(item => item.name === name)
    if (!product) {
      throw new NotFoundError(`${ErrorCode.NOT_FOUND} name ${name}`)
    }
    return product
  }
  async findAllByIds(productIds: ProductId[]): Promise<ProductProps[]> {
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
    items: ProductProps[],
    filter?: string,
  ): Promise<ProductProps[]> {
    if (!filter) return items
    return items.filter(item =>
      item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    )
  }

  protected async applySort(
    items: ProductProps[],
    sortBy?: keyof ProductProps | undefined,
    sortDirection?: 'asc' | 'desc',
  ): Promise<ProductProps[]> {
    return super.applySort(
      items,
      sortBy ?? 'createdAt',
      sortDirection ?? 'desc',
    )
  }
}
