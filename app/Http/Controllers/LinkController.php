<?php

namespace App\Http\Controllers;

use App\Http\Requests\Link\CreateLinkRequest;
use App\Http\Requests\Link\UpdateLinkRequest;
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

    /**
     * Redirect short URL to original URL.
     */
    public function redirect(string $short_code)
    {
        $url = Url::where('short_code', $short_code)->firstOrFail();

        return redirect()->away($url->original_url);
    }
}
