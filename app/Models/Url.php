<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Url extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = [];

    public $incrementing = false;
    protected $keyType = 'string';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function urlReferrers()
    {
        return $this->hasMany(UrlReferrer::class);
    }

    public function clickLogs()
    {
        return $this->hasMany(ClickLog::class);
    }
}
