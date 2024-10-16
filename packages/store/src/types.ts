export type RouteName = 'HOME' | 'POST' | 'SPACE_HOME'

export type IRouterStore = {
  name: RouteName
  params: Record<string, any>
}

export type PublishingState = {
  isLoading: boolean
  status: string
}
