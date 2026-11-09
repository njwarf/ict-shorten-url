import type { User } from "@/types"

export interface DashboardStats {
  totalClicks: number
  activeLinks: number
  averageClicks: number
  topSource: string
}

export interface TopPerformingLink {
  id: string
  title: string
  original_url: string
  short_code: string
  click_count: number
}

export interface RecentActivity {
  id: string
  title: string
  original_url: string
  short_code: string
  is_active: boolean
  click_count: number
  created_at: string
}

export interface ClicksByDate {
  date: string
  clicks: number
}

export interface DashboardProps {
  stats: DashboardStats
  topPerforming: TopPerformingLink[]
  recentActivity: RecentActivity[]
  clicksByDate: ClicksByDate[]
  start_date?: string
  end_date?: string
  auth: {
    user: User
  }
}
