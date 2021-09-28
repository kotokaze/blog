interface ResRoot<T> {
  contents: T
  totalCount: number
  offset?: number
  limit?: number
}

interface Content {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}
