<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Enums\Role;
use App\Models\Url;

#[Fillable(['name', 'email', 'password', 'username', 'sso_id'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => Role::class,
        ];
    }

    public function urls()
    {
      return $this->hasMany(Url::class);
    }

    public function isAdmin(): bool
    {
      return $this->role === Role::ADMIN;
    }

    public function isUser(): bool
    {
      return $this->role === Role::USER;
    }

    public function hasRole(Role|string ...$roles): bool
    {
      foreach ($roles as $role) {
        $role = $role instanceof Role ? $role : Role::from($role);

        if ($this->role === $role) {
          return true;
        }
      }

      return false;
    }
}
