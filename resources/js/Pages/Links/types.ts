export interface LinkAnalyticsDaily {
  date: string
  clicks: number
}

export interface LinkItem {
  id: string
  title: string
  original_url: string
  short_code: string
  is_active: boolean
  is_pinned?: boolean
  click_count?: number
  created_at?: string
  updated_at?: string
  analytics_7d?: number
  analytics_daily?: LinkAnalyticsDaily[]
}

export interface PaginationLinkData {
  url: string | null
  label: string
  active: boolean
}

export interface PaginatedLinks<T = LinkItem> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number | null
  to: number | null
  links: PaginationLinkData[]
}

export interface LinksIndexProps {
  links: PaginatedLinks<LinkItem>
  filters?: {
    search?: string
  }
}

export interface LinkFormProps {
  link?: {
    id: string
    title: string
    original_url: string
    short_code: string
  }
}
