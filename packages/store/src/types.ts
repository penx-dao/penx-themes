export type RouteName = 'HOME' | 'POST'

export type IRouterStore = {
  name: RouteName
  params: Record<string, any>
}

export type PublishingState = {
  isLoading: boolean
  status: string
}
