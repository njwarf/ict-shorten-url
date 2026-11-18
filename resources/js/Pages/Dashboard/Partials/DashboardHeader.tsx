import { Link } from "@inertiajs/react"
import { format } from "date-fns"
import { CalendarDays, ChevronDown, Plus } from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"

interface DashboardHeaderProps {
  userName: string
  totalDays: number
  dateRange: {
    from: Date
    to: Date
  }
  onDateRangeChange: (range: { from: Date; to: Date }) => void
}

export function DashboardHeader({
  userName,
  totalDays,
  dateRange,
  onDateRangeChange,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white border border-blue-100 p-6 rounded-2xl shadow-sm transition-all hover:border-blue-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Selamat datang kembali, <span className="text-blue-900">{userName}</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Berikut adalah ringkasan performa tautan Anda selama{" "}
          <span className="font-medium text-blue-600">{totalDays} hari terakhir</span>.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-9 justify-start text-left font-normal border-blue-100 hover:bg-blue-50/50 hover:text-blue-900"
            >
              <CalendarDays className="size-4 text-blue-600 mr-2" />
              <span>
                {format(dateRange.from, "MMM d, yyyy")} -{" "}
                {format(dateRange.to, "MMM d, yyyy")}
              </span>
              <ChevronDown className="size-3.5 text-blue-500 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-blue-100 shadow-lg" align="end">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  onDateRangeChange({
                    from: range.from,
                    to: range.to,
                  })
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Button asChild size="sm" className="h-9 gap-1.5 bg-blue-900 hover:bg-blue-800 text-white shadow-sm">
          <Link href="/links/create">
            <Plus className="size-4" />
            <span>Buat Tautan</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}