interface ResRoot<T> {
  contents: T
  totalCount: number
  offset?: number
  limit?: number
}

interface EditInfo {
  createdAt: string
  updatedAt: string
  publishedAt?: string
  revisedAt?: string
}

interface Content extends EditInfo {
  id: string
}

interface MethodsGetContentQuery {
  draftKey?: string
  fields?: string
  depth?: number
}

interface MethodsGetQuery extends MethodsGetContentQuery {
  limit?: number
  offset?: number
  orders?: string
  q?: string
  ids?: string
  filters?: string
}
