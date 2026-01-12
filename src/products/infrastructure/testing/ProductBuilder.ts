import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { ProductEntity } from '../typeorm/entities/product.entity'

/**
 * Factory para criação de ProductEntity em testes
 * - Garante entidade válida
 * - Permite override controlado
 * - Determinística (faker seed)
 */
export function productFactory(
  override: Partial<ProductEntity> = {},
): ProductEntity {
  // Seed garante previsibilidade nos testes
  faker.seed(1)

  const now = new Date()

  return {
    id: override.id ?? randomUUID(),
    name: override.name ?? faker.commerce.productName(),
    price:
      override.price ??
      Number(faker.commerce.price({ min: 100, max: 2000, dec: 2 })),
    quantity: override.quantity ?? 10,
    createdAt: override.createdAt ?? now,
    updatedAt: override.updatedAt ?? now,
  }
}

/**
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { ProductEntity } from '../typeorm/entities/product.entity'

export function productFactory(
  override: Partial<ProductEntity> = {},
): ProductEntity {
  // Seed garante previsibilidade nos testes
  faker.seed(1)

  const now = new Date()

  return new ProductEntity({
    id: override.id ?? randomUUID(),
    name: override.name ?? faker.commerce.productName(),
    price:
      override.price ??
      Number(faker.commerce.price({ min: 100, max: 2000, dec: 2 })),
    quantity: override.quantity ?? 10,
    createdAt: override.createdAt ?? now,
    updatedAt: override.updatedAt ?? now,
  })
}

 */
