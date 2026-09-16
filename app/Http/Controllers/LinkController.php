<?php

namespace App\Http\Controllers;

use App\Http\Requests\Link\CreateLinkRequest;
use App\Http\Requests\Link\UpdateLinkRequest;
use App\Models\ClickLog;
use App\Models\UrlReferrer;
use Illuminate\Support\Facades\DB;
use App\Models\Url;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index(Request $request)
{
    $links = Url::query()
        ->where('user_id', auth()->id())
        ->when($request->search, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('original_url', 'like', "%{$search}%")
                    ->orWhere('short_code', 'like', "%{$search}%");
            });
        })
        ->latest()
        ->paginate(10)
        ->withQueryString();

    return Inertia::render('Links/Index', [
        'links' => $links,
        'filters' => [
            'search' => $request->search,
        ],
    ]);
}
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Links/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateLinkRequest $request)
    {
        Url::create([
            'id' => Str::uuid(),
            'user_id' => auth()->id(),
            'title' => $request->title,
            'original_url' => $request->original_url,
            'short_code' => $request->short_code ?? Str::random(6),
        ]);

        return to_route('links.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $link = Url::query()
            ->where('user_id', auth()->id())
            ->findOrFail($id);

        return Inertia::render('Links/Form', [
            'link' => $link,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLinkRequest $request, string $id)
    {
        $link = Url::query()
            ->where('user_id', auth()->id())
            ->findOrFail($id);

        $link->update([
            'title' => $request->title,
            'original_url' => $request->original_url,
            'short_code' => $request->short_code,
        ]);

        return redirect()->route('links.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $link = Url::query()
            ->where('user_id', auth()->id())
            ->findOrFail($id);

        $link->delete();

        return redirect()->route('links.index');
    }
    public function togglePin(String $id)
    {
      $link =Url::query()
      ->where('user_id', auth()->id())
      ->findOrFail($id);

      if (!$link->is_pinned) {
        $pinnedCount = Url::query()
        ->where('user_id', auth()->id())
        ->where('is_pinned', true)
        ->count();

        if ($pinnedCount >= 5) {
           return back()->with('error', 'Maksimal hanya 5 link yang dapat dipin.');
        }
      }

      $link->update([
        'is_pinned' => !$link->is_pinned,
      ]);

      return back();
    }

    /**
     * Redirect short URL to original URL.
     */
    public function redirect(string $short_code)
    {
        $url = Url::where('short_code', $short_code)->firstOrFail();

         $ipAddress = request()->ip();
    $userAgent = request()->userAgent();
    $referrer = request()->headers->get('referer');

    DB::transaction(function () use (
        $url,
        $ipAddress,
        $userAgent,
        $referrer
    ) {
        $referrerSlug = null;

        if ($referrer) {
            $referrerHost = parse_url($referrer, PHP_URL_HOST);

            $referrerSlug = match (true) {
                str_contains($referrerHost ?? '', 'facebook.com') => 'fb',
                str_contains($referrerHost ?? '', 'instagram.com') => 'ig',
                str_contains($referrerHost ?? '', 'youtube.com') => 'yt',
                str_contains($referrerHost ?? '', 'tiktok.com') => 'tt',
                str_contains($referrerHost ?? '', 'whatsapp.com') => 'wa',
                default => null,
            };
        }

        ClickLog::create([
            'id' => Str::uuid(),
            'url_id' => $url->id,
            'referrer_slug' => $referrerSlug,
            'user_agent' => $userAgent ?? 'Unknown',
            'ip_address' => $ipAddress ?? 'Unknown',
            'clicked_at' => now(),
        ]);

        $url->increment('click_count');

        $url->update([
            'last_clicked_at' => now(),
            'unique_ip_count' => $url->clickLogs()
                ->distinct('ip_address')
                ->count('ip_address'),
            'top_user_agent' => $url->clickLogs()
                ->select('user_agent')
                ->groupBy('user_agent')
                ->orderByDesc(DB::raw('COUNT(*)'))
                ->value('user_agent'),
        ]);

        if ($referrerSlug) {
            $urlReferrer = UrlReferrer::where('url_id', $url->id)
                ->where('referrer_slug', $referrerSlug)
                ->first();

            if ($urlReferrer) {
                $urlReferrer->increment('click_count');

                $urlReferrer->update([
                    'last_clicked_at' => now(),
                ]);
            }
        }
    });

        return redirect()->away($url->original_url);
    }
}
