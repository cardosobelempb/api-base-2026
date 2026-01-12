// infra/typeorm/mappers/product.mapper.ts
import { ProductEntity } from '@/products/domain/entities/product.entity'
import { ProductOrmEntity } from '../entities/product.orm-entity'
import { UUIDVO } from '@/common'

export class ProductMapper {
  static toDomain(entity: ProductOrmEntity): ProductEntity {
    return ProductEntity.create(
      {
        name: entity.name,
        price: Number(entity.price),
        quantity: entity.quantity,
      },
      UUIDVO.create(entity.id),
    )
  }

  static toOrm(entity: ProductEntity): ProductOrmEntity {
    return {
      id: entity.id.toString(),
      name: entity.name,
      price: entity.price.toFixed(2),
      quantity: entity.quantity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    }
  }
}
