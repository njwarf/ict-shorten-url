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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Selamat datang kembali, {userName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Berikut adalah ringkasan performa tautan Anda selama {totalDays} hari terakhir.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-9 justify-start text-left font-normal"
            >
              <CalendarDays className="size-4 text-muted-foreground" />
              <span>
                {format(dateRange.from, "MMM d, yyyy")} -{" "}
                {format(dateRange.to, "MMM d, yyyy")}
              </span>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
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

        <Button asChild size="sm" className="h-9 gap-1.5">
          <Link href="/links/create">
            <Plus className="size-4" />
            <span>Buat Tautan</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}