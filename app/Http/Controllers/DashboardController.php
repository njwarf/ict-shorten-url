<?php

namespace App\Http\Controllers;

use App\Models\ClickLog;
use App\Models\Url;
use App\Models\UrlReferrer;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = auth()->id();

        $urls = Url::where('user_id', $userId);

        $totalClicks = (clone $urls)->sum('click_count');

        $activeLinks = (clone $urls)
            ->where('click_count', '>', 0)
            ->count();

        $averageClicks = (clone $urls)->avg('click_count');

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

        // Data klik per hari untuk Area Chart
        $clicksByDate = ClickLog::query()
            ->whereHas('url', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
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
                'averageClicks' => round($averageClicks ?? 0, 2),
                'topSource' => $topSource?->referrer_slug ?? '-',
            ],
            'topPerforming' => $topPerforming,
            'recentActivity' => $recentActivity,
            'clicksByDate' => $clicksByDate,
        ]);
    }
}
