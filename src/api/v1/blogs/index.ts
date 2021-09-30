export type Methods = {
  get: {
    query?: MethodsGetQuery
    resBody: ResRoot<Article[]>
  }
}
