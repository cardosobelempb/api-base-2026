// domain/entities/product.entity.ts
import { DomainEntity, UUIDVO } from '@/common'

export interface ProductProps {
  id: UUIDVO
  name: string
  price: number
  quantity: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export class ProductEntity extends DomainEntity<ProductProps> {
  get name() {
    return this.props.name
  }

  get price() {
    return this.props.price
  }

  get quantity() {
    return this.props.quantity
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get deletedAt() {
    return this.props.deletedAt
  }

  updatePrice(price: number) {
    this.props.price = price
    this.touch()
  }

  softDelete() {
    this.props.deletedAt = new Date()
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Omit<ProductProps, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UUIDVO,
  ) {
    const now = new Date()

    return new ProductEntity(
      {
        ...props,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      },
      id,
    )
  }
}
