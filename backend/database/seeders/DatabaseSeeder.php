<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Default Admin User
        User::updateOrCreate(
            ['email' => 'admin@neema.com'],
            [
                'name' => 'Studio Administrator',
                'password' => Hash::make('admin123'),
            ]
        );

        // Seed initial gallery residences
        $this->call(GalleryItemSeeder::class);
    }
}
