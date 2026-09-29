<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UrlReferrer extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = [];

    public $incrementing = false;
    protected $keyType = 'string';

    public function url()
    {
        return $this->belongsTo(Url::class);
    }

    public function referrer()
    {
        return $this->belongsTo(
            Referrer::class,
            'referrer_slug',
            'slug'
        );
    }
}
