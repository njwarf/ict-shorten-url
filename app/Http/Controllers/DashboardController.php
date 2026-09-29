<?php

namespace App\Http\Controllers;

use App\Models\ClickLog;
use App\Models\Url;
use App\Models\UrlReferrer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id();

        $validated = $request->validate([
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
        ]);

        $startDate = isset($validated['start_date'])
            ? Carbon::parse($validated['start_date'])->startOfDay()
            : now()->subDays(29)->startOfDay();

        $endDate = isset($validated['end_date'])
            ? Carbon::parse($validated['end_date'])->endOfDay()
            : now()->endOfDay();

        $urls = Url::where('user_id', $userId);

        $clickLogs = ClickLog::query()
            ->whereHas('url', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->whereBetween('clicked_at', [$startDate, $endDate]);

        $totalClicks = (clone $clickLogs)->count();

        $activeLinks = (clone $clickLogs)
            ->distinct('url_id')
            ->count('url_id');

      $averageClicks = $activeLinks > 0
    ? round($totalClicks / $activeLinks, 2)
    : 0;
        $topSource = UrlReferrer::query()
            ->whereHas('url', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->orderByDesc('click_count')
            ->first();

        $topPerforming = (clone $urls)
            ->orderByDesc('click_count')
            ->limit(5)
            ->get([
                'id',
                'title',
                'original_url',
                'short_code',
                'click_count',
            ]);

        $recentActivity = (clone $urls)
            ->latest()
            ->limit(5)
            ->get([
                'id',
                'title',
                'original_url',
                'short_code',
                'is_active',
                'click_count',
                'created_at',
            ]);

        $clicksByDate = (clone $clickLogs)
            ->selectRaw('DATE(clicked_at) as date, COUNT(*) as clicks')
            ->groupByRaw('DATE(clicked_at)')
            ->orderBy('date')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->date,
                    'clicks' => (int) $item->clicks,
                ];
            })
            ->values();

       return Inertia::render('Dashboard', [
    'stats' => [
        'totalClicks' => $totalClicks,
        'activeLinks' => $activeLinks,
        'averageClicks' => $averageClicks,
        'topSource' => $topSource?->referrer_slug ?? '-',
    ],
    'topPerforming' => $topPerforming,
    'recentActivity' => $recentActivity,
    'clicksByDate' => $clicksByDate,
    'start_date' => $startDate->toDateString(),
    'end_date' => $endDate->toDateString(),
]);
    }
}
