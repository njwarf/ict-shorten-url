<?php

namespace App\Jobs;

use App\Models\Url;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;

class UpdateLinkAnalyticsJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $urlId
    ) {
    }

    public function handle(): void
    {
        $url = Url::find($this->urlId);

        if (!$url) {
            return;
        }

        $uniqueIpCount = $url->clickLogs()
            ->distinct('ip_address')
            ->count('ip_address');

        $topUserAgent = $url->clickLogs()
            ->select('user_agent')
            ->groupBy('user_agent')
            ->orderByDesc(DB::raw('COUNT(*)'))
            ->value('user_agent');

        $url->update([
            'unique_ip_count' => $uniqueIpCount,
            'top_user_agent' => $topUserAgent,
        ]);
    }
}
