// infrastructure/mappers/product.mapper.ts

import { ProductEntity, ProductModel } from '@/products/domain'

export class ProductMapper {
  static toDomain(model: ProductModel): ProductEntity {
    return ProductEntity.restore({
      id: model.id,
      name: model.name,
      price: model.price,
      quantity: model.quantity,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    })
  }

  static toModel(entity: ProductEntity): ProductModel {
    return {
      id: entity.id,
      name: entity.name,
      price: entity.price,
      quantity: entity.quantity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    }
  }
}
