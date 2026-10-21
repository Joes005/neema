<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class GalleryController extends Controller
{
    /**
     * Display a listing of the gallery items.
     */
    public function index(Request $request)
    {
        $query = GalleryItem::query();

        if ($request->filled('category') && strtoupper($request->category) !== 'ALL') {
            $query->where('category', strtoupper($request->category));
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        $items = $query->orderBy('order_num', 'asc')->orderBy('id', 'asc')->get();

        return response()->json([
            'success' => true,
            'count' => $items->count(),
            'data' => $items,
        ]);
    }

    /**
     * Store a newly created gallery item.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'location' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp,avif|max:15360', // max 15MB
            'description' => 'nullable|string',
            'quote' => 'nullable|string',
            'span_classes' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
            'order_num' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('gallery', 'public');
            $validated['image_path'] = $path;
        }

        $validated['category'] = strtoupper($validated['category']);
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['span_classes'] = $validated['span_classes'] ?? 'col-span-1 md:col-span-2 row-span-2';
        $validated['order_num'] = $validated['order_num'] ?? (GalleryItem::max('order_num') + 1);

        $item = GalleryItem::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Gallery image uploaded successfully',
            'data' => $item,
        ], 201);
    }

    /**
     * Display the specified gallery item.
     */
    public function show($id)
    {
        $item = GalleryItem::find($id);

        if (!$item) {
            return response()->json([
                'success' => false,
                'message' => 'Gallery item not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $item,
        ]);
    }

    /**
     * Update the specified gallery item.
     */
    public function update(Request $request, $id)
    {
        $item = GalleryItem::find($id);

        if (!$item) {
            return response()->json([
                'success' => false,
                'message' => 'Gallery item not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string|max:100',
            'location' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,avif|max:15360',
            'description' => 'nullable|string',
            'quote' => 'nullable|string',
            'span_classes' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
            'order_num' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        // Handle image replacement if provided
        if ($request->hasFile('image')) {
            // Delete previous image file from storage if it exists and is local
            if ($item->image_path && !str_starts_with($item->image_path, 'http') && !str_starts_with($item->image_path, '/images/')) {
                Storage::disk('public')->delete($item->image_path);
            }

            $path = $request->file('image')->store('gallery', 'public');
            $data['image_path'] = $path;
        }

        if (isset($data['category'])) {
            $data['category'] = strtoupper($data['category']);
        }

        if ($request->has('is_featured')) {
            $data['is_featured'] = $request->boolean('is_featured');
        }

        $item->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Gallery item updated successfully',
            'data' => $item->fresh(),
        ]);
    }

    /**
     * Remove the specified gallery item.
     */
    public function destroy($id)
    {
        $item = GalleryItem::find($id);

        if (!$item) {
            return response()->json([
                'success' => false,
                'message' => 'Gallery item not found',
            ], 404);
        }

        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Gallery item deleted successfully',
        ]);
    }
}
