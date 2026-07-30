<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Referrer extends Model
{
  use HasFactory;

  protected $primaryKey = 'slug';
    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = false;

    protected $guarded = [];

    public function urlReferrers()
    {
        return $this->hasMany(
            UrlReferrer::class,
            'referrer_slug',
            'slug'
        );
    }

    public function clickLogs()
    {
        return $this->hasMany(
            ClickLog::class,
            'referrer_slug',
            'slug'
        );
    }
}
