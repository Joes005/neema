<?php

namespace App\Http\Controllers;

use App\Models\GalleryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class AdminGalleryController extends Controller
{
    /**
     * Show admin gallery dashboard.
     */
    public function index(Request $request)
    {
        $category = $request->query('category', 'ALL');

        $query = GalleryItem::query();
        if ($category !== 'ALL') {
            $query->where('category', strtoupper($category));
        }

        $items = $query->orderBy('order_num', 'asc')->orderBy('id', 'desc')->get();

        $stats = [
            'total' => GalleryItem::count(),
            'living' => GalleryItem::where('category', 'LIVING')->count(),
            'kitchen' => GalleryItem::where('category', 'KITCHEN')->count(),
            'bedroom' => GalleryItem::where('category', 'BEDROOM')->count(),
            'joinery' => GalleryItem::where('category', 'JOINERY')->count(),
            'bath' => GalleryItem::where('category', 'BATH')->count(),
            'featured' => GalleryItem::where('is_featured', true)->count(),
        ];

        $storageLinked = File::exists(public_path('storage'));

        return view('admin.gallery', compact('items', 'stats', 'category', 'storageLinked'));
    }

    /**
     * Store new gallery item from admin panel.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'location' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp,avif|max:15360',
            'description' => 'nullable|string',
            'quote' => 'nullable|string',
            'span_classes' => 'nullable|string',
            'order_num' => 'nullable|integer',
        ]);

        $path = $request->file('image')->store('gallery', 'public');

        GalleryItem::create([
            'title' => $request->title,
            'category' => strtoupper($request->category),
            'location' => $request->location,
            'image_path' => $path,
            'description' => $request->description,
            'quote' => $request->quote,
            'span_classes' => $request->span_classes ?: 'col-span-1 md:col-span-2 row-span-2',
            'is_featured' => $request->has('is_featured'),
            'order_num' => $request->order_num ?: (GalleryItem::max('order_num') + 1),
        ]);

        return redirect()->route('admin.gallery.index')->with('success', 'New gallery image uploaded successfully!');
    }

    /**
     * Update gallery item from admin panel.
     */
    public function update(Request $request, $id)
    {
        $item = GalleryItem::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'location' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,avif|max:15360',
            'description' => 'nullable|string',
            'quote' => 'nullable|string',
            'span_classes' => 'nullable|string',
            'order_num' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            // Delete old file if local
            if ($item->image_path && !str_starts_with($item->image_path, 'http') && !str_starts_with($item->image_path, '/images/')) {
                Storage::disk('public')->delete($item->image_path);
            }
            $item->image_path = $request->file('image')->store('gallery', 'public');
        }

        $item->title = $request->title;
        $item->category = strtoupper($request->category);
        $item->location = $request->location;
        $item->description = $request->description;
        $item->quote = $request->quote;
        $item->span_classes = $request->span_classes ?: $item->span_classes;
        $item->is_featured = $request->has('is_featured');
        if ($request->filled('order_num')) {
            $item->order_num = (int) $request->order_num;
        }

        $item->save();

        return redirect()->route('admin.gallery.index')->with('success', "Gallery item '{$item->title}' updated successfully!");
    }

    /**
     * Delete gallery item.
     */
    public function destroy($id)
    {
        $item = GalleryItem::findOrFail($id);
        $title = $item->title;
        $item->delete();

        return redirect()->route('admin.gallery.index')->with('success', "Gallery item '{$title}' removed successfully!");
    }

    /**
     * Helper to create storage symlink (especially for Hostinger cPanel / hPanel).
     */
    public function setupStorage()
    {
        try {
            Artisan::call('storage:link');
            return redirect()->route('admin.gallery.index')->with('success', 'Storage link connected successfully!');
        } catch (\Exception $e) {
            // Fallback manual symlink
            $target = storage_path('app/public');
            $link = public_path('storage');
            if (!file_exists($link)) {
                @symlink($target, $link);
            }
            return redirect()->route('admin.gallery.index')->with('success', 'Storage link created!');
        }
    }
}
