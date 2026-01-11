export type SearchInput = {
  page: number
  perPage?: number // substitui size
  filter?: string
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type SearchOutput<T> = {
  items: T[]
  total: number
  perPage: number
  currentPage: number
  totalPages: number
  filter?: string
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
