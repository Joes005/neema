<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class GalleryItem extends Model
{
    use HasFactory;

    protected $table = 'gallery_items';

    protected $fillable = [
        'title',
        'category',
        'location',
        'image_path',
        'description',
        'quote',
        'span_classes',
        'is_featured',
        'order_num',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'order_num' => 'integer',
    ];

    protected $appends = [
        'image_url',
        'src',
        'image',
        'roomType',
        'spanClasses',
        'isFeatured',
    ];

    /**
     * Get the full absolute or public URL for the image.
     */
    public function getImageUrlAttribute(): string
    {
        if (empty($this->image_path)) {
            return '/images/hero-living.jpg';
        }

        // External or pre-existing static path
        if (str_starts_with($this->image_path, 'http://') || str_starts_with($this->image_path, 'https://')) {
            return $this->image_path;
        }

        if (str_starts_with($this->image_path, '/images/')) {
            return $this->image_path;
        }

        return url('storage/' . ltrim($this->image_path, '/'));
    }

    public function getSrcAttribute(): string
    {
        return $this->image_url;
    }

    public function getImageAttribute(): string
    {
        return $this->image_url;
    }

    public function getRoomTypeAttribute(): ?string
    {
        return $this->category;
    }

    public function getSpanClassesAttribute(): string
    {
        return $this->attributes['span_classes'] ?? 'col-span-1 md:col-span-2 row-span-2';
    }

    public function getIsFeaturedAttribute(): bool
    {
        return (bool) ($this->attributes['is_featured'] ?? false);
    }

    /**
     * Delete stored image file when model is deleted.
     */
    protected static function booted()
    {
        static::deleting(function ($item) {
            if ($item->image_path && !str_starts_with($item->image_path, 'http') && !str_starts_with($item->image_path, '/images/')) {
                Storage::disk('public')->delete($item->image_path);
            }
        });
    }
}
