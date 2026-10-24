<!DOCTYPE html>
<html lang="en" class="h-full bg-[#141311] text-[#F9F8F3]">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gallery Studio Manager | NEEMA / LUVELLE INTERIORS</title>
    <!-- Tailwind CSS CDN for Admin Panel -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Cinzel', serif; }
        .gold-glow { box-shadow: 0 0 25px rgba(197, 168, 128, 0.15); }
    </style>
</head>
<body class="min-h-full flex flex-col bg-[#141311] text-[#F9F8F3]">

    <!-- Top Luxury Header -->
    <header class="border-b border-white/10 bg-[#1C1B18]/90 backdrop-blur-md sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <div class="w-10 h-10 rounded-full border border-[#C5A880]/40 flex items-center justify-center bg-[#C5A880]/10 text-[#C5A880] font-serif font-bold text-lg">
                    N
                </div>
                <div>
                    <h1 class="font-serif text-lg tracking-wider text-[#F9F8F3] font-semibold">NEEMA / LUVELLE</h1>
                    <p class="text-[11px] font-mono tracking-widest text-[#C5A880] uppercase">Gallery Studio Manager</p>
                </div>
            </div>

            <div class="flex items-center space-x-3">
                <a href="/" class="px-3.5 py-2 text-xs font-mono tracking-wider rounded-lg border border-white/10 hover:border-[#C5A880] text-white/80 hover:text-white transition flex items-center space-x-1.5">
                    <svg class="w-3.5 h-3.5 text-[#C5A880]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                    <span>View Website</span>
                </a>

                <a href="{{ url('/api/gallery') }}" target="_blank" class="px-3.5 py-2 text-xs font-mono tracking-wider rounded-lg border border-white/10 hover:border-[#C5A880] text-white/80 hover:text-white transition flex items-center space-x-1.5">
                    <svg class="w-3.5 h-3.5 text-[#C5A880]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                    <span>API JSON</span>
                </a>

                @if(!$storageLinked)
                <a href="{{ route('admin.gallery.setup-storage') }}" class="px-3.5 py-2 text-xs font-semibold rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition">
                    Connect Storage Link
                </a>
                @endif

                <button onclick="openModal('createModal')" class="px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg bg-[#C5A880] text-[#141311] hover:bg-[#d8bc94] transition-all flex items-center space-x-2 shadow-lg shadow-[#C5A880]/20 font-medium">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    <span>Add New Image</span>
                </button>
            </div>
        </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <!-- Flash Notification -->
        @if(session('success'))
        <div class="mb-6 p-4 rounded-xl bg-[#C5A880]/15 border border-[#C5A880]/40 text-[#F9F8F3] flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-full bg-[#C5A880] text-[#141311] flex items-center justify-center font-bold">✓</div>
                <p class="text-sm font-medium">{{ session('success') }}</p>
            </div>
            <button onclick="this.parentElement.remove()" class="text-white/60 hover:text-white">&times;</button>
        </div>
        @endif

        @if($errors->any())
        <div class="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200">
            <p class="font-semibold text-sm mb-1">Please fix the following issues:</p>
            <ul class="list-disc list-inside text-xs space-y-1">
                @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
        @endif

        <!-- Quick Metrics -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            <div class="bg-[#1C1B18] border border-white/10 rounded-xl p-4">
                <p class="text-[10px] uppercase font-mono tracking-wider text-white/50">Total Gallery</p>
                <p class="font-serif text-2xl text-[#C5A880] mt-1">{{ $stats['total'] }}</p>
            </div>
            <div class="bg-[#1C1B18] border border-white/10 rounded-xl p-4">
                <p class="text-[10px] uppercase font-mono tracking-wider text-white/50">Living</p>
                <p class="font-serif text-2xl text-white mt-1">{{ $stats['living'] }}</p>
            </div>
            <div class="bg-[#1C1B18] border border-white/10 rounded-xl p-4">
                <p class="text-[10px] uppercase font-mono tracking-wider text-white/50">Kitchen</p>
                <p class="font-serif text-2xl text-white mt-1">{{ $stats['kitchen'] }}</p>
            </div>
            <div class="bg-[#1C1B18] border border-white/10 rounded-xl p-4">
                <p class="text-[10px] uppercase font-mono tracking-wider text-white/50">Bedroom</p>
                <p class="font-serif text-2xl text-white mt-1">{{ $stats['bedroom'] }}</p>
            </div>
            <div class="bg-[#1C1B18] border border-white/10 rounded-xl p-4">
                <p class="text-[10px] uppercase font-mono tracking-wider text-white/50">Joinery / Wardrobes</p>
                <p class="font-serif text-2xl text-white mt-1">{{ $stats['joinery'] }}</p>
            </div>
            <div class="bg-[#1C1B18] border border-white/10 rounded-xl p-4">
                <p class="text-[10px] uppercase font-mono tracking-wider text-white/50">Bath Retreats</p>
                <p class="font-serif text-2xl text-white mt-1">{{ $stats['bath'] }}</p>
            </div>
        </div>

        <!-- Filter Navigation Tabs -->
        <div class="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
            <div class="flex flex-wrap gap-2">
                @php
                    $cats = ['ALL', 'LIVING', 'KITCHEN', 'BEDROOM', 'JOINERY', 'BATH'];
                @endphp
                @foreach($cats as $cat)
                <a href="{{ route('admin.gallery.index', ['category' => $cat]) }}"
                   class="px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition {{ $category === $cat ? 'bg-[#C5A880] text-[#141311]' : 'bg-[#1C1B18] text-white/70 hover:text-white border border-white/10' }}">
                    {{ $cat }}
                </a>
                @endforeach
            </div>

            <p class="text-xs text-white/50 font-mono">
                Showing {{ $items->count() }} of {{ $stats['total'] }} items
            </p>
        </div>

        <!-- Gallery Grid -->
        @if($items->isEmpty())
        <div class="text-center py-24 bg-[#1C1B18]/50 rounded-2xl border border-white/10">
            <p class="font-serif text-2xl text-white/70 mb-2">No Gallery Items Found</p>
            <p class="text-xs text-white/40 mb-6">Start by adding your first project photo to the gallery</p>
            <button onclick="openModal('createModal')" class="px-5 py-2.5 bg-[#C5A880] text-[#141311] rounded-lg text-xs font-semibold tracking-wider uppercase">
                + Add First Image
            </button>
        </div>
        @else
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach($items as $item)
            <div class="bg-[#1C1B18] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#C5A880]/50 transition-all duration-300 flex flex-col justify-between">
                <div>
                    <!-- Image Card Header -->
                    <div class="relative h-56 w-full overflow-hidden bg-black/40">
                        <img src="{{ $item->image_url }}" alt="{{ $item->title }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                        <!-- Top Badges -->
                        <div class="absolute top-3 left-3 flex items-center space-x-2">
                            <span class="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-wider uppercase text-[#C5A880] border border-white/10">
                                {{ $item->category }}
                            </span>
                            @if($item->is_featured)
                            <span class="px-2 py-0.5 rounded bg-[#C5A880] text-[#141311] text-[9px] font-bold tracking-wider uppercase">
                                FEATURED
                            </span>
                            @endif
                        </div>

                        <!-- Order Tag -->
                        <div class="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 text-white/70 text-[10px] font-mono">
                            #{{ $item->order_num }}
                        </div>

                        <!-- Location on bottom of image -->
                        <div class="absolute bottom-3 left-3 text-xs text-[#C5A880] font-mono">
                            📍 {{ $item->location ?: 'Chennai, India' }}
                        </div>
                    </div>

                    <!-- Card Body -->
                    <div class="p-5">
                        <h3 class="font-serif text-lg font-medium text-white mb-2 leading-snug">{{ $item->title }}</h3>
                        <p class="text-xs text-white/60 line-clamp-2 leading-relaxed mb-4">
                            {{ $item->description ?: 'No description provided.' }}
                        </p>
                    </div>
                </div>

                <!-- Card Actions -->
                <div class="px-5 py-4 bg-black/20 border-t border-white/5 flex items-center justify-between">
                    <a href="{{ $item->image_url }}" target="_blank" class="text-[11px] font-mono text-white/50 hover:text-[#C5A880] transition flex items-center space-x-1">
                        <span>View Photo</span>
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    </a>

                    <div class="flex items-center space-x-2">
                        <!-- Edit Button -->
                        <button onclick="openEditModal({{ json_encode($item) }})" class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#C5A880] hover:text-[#141311] text-xs font-semibold tracking-wider transition">
                            Edit
                        </button>

                        <!-- Delete Button -->
                        <form action="{{ route('admin.gallery.destroy', $item->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete \'{{ addslashes($item->title) }}\'? This cannot be undone.')">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-300 hover:text-white text-xs transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
        @endif

    </main>

    <!-- CREATE MODAL -->
    <div id="createModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm hidden items-center justify-center p-4 overflow-y-auto">
        <div class="bg-[#1C1B18] border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
            <button onclick="closeModal('createModal')" class="absolute top-5 right-5 text-white/50 hover:text-white text-2xl leading-none">&times;</button>
            <h2 class="font-serif text-2xl text-white mb-1">Add New Gallery Image</h2>
            <p class="text-xs text-white/50 font-mono mb-6">Upload an architectural photo and configure project details</p>

            <form action="{{ route('admin.gallery.store') }}" method="POST" enctype="multipart/form-data" class="space-y-4">
                @csrf

                <!-- File Upload with Live Preview -->
                <div>
                    <label class="block text-xs font-mono uppercase tracking-wider text-[#C5A880] mb-1.5">Select Image File *</label>
                    <div class="border-2 border-dashed border-white/20 hover:border-[#C5A880] rounded-xl p-4 text-center cursor-pointer transition relative bg-black/20" onclick="document.getElementById('createImageInput').click()">
                        <input type="file" id="createImageInput" name="image" accept="image/*" required class="hidden" onchange="previewImage(this, 'createImagePreview')">
                        <div id="createImagePlaceholder">
                            <svg class="w-8 h-8 mx-auto text-[#C5A880] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            <p class="text-xs text-white/80 font-medium">Click to choose image file (JPG, PNG, WEBP)</p>
                            <p class="text-[10px] text-white/40 mt-1">High resolution architectural photos up to 15MB</p>
                        </div>
                        <img id="createImagePreview" class="hidden w-full max-h-56 object-cover rounded-lg mx-auto" />
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">Project Title *</label>
                        <input type="text" name="title" required placeholder="e.g. The Fluted Teak Suite" class="w-full bg-black/30 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880]">
                    </div>

                    <div>
                        <label class="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">Category *</label>
                        <select name="category" required class="w-full bg-[#141311] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880]">
                            <option value="LIVING">LIVING (Living Room / Pavilion)</option>
                            <option value="KITCHEN">KITCHEN (Gourmet / Modular)</option>
                            <option value="BEDROOM">BEDROOM (Master / Guest Suite)</option>
                            <option value="JOINERY">JOINERY (Wardrobes / Custom Millwork)</option>
                            <option value="BATH">BATH (Spa Retreat / Powder Room)</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">Location</label>
                        <input type="text" name="location" placeholder="e.g. Poes Garden, Chennai" class="w-full bg-black/30 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880]">
                    </div>

                    <div>
                        <label class="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">Grid Span Layout</label>
                        <select name="span_classes" class="w-full bg-[#141311] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880]">
                            <option value="col-span-1 md:col-span-2 row-span-2">Standard (2 Columns)</option>
                            <option value="col-span-1 md:col-span-3 row-span-2">Wide Bento (3 Columns)</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">Architectural Description</label>
                    <textarea name="description" rows="2" placeholder="Key materials, illumination accents, and design details..." class="w-full bg-black/30 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880]"></textarea>
                </div>

                <div>
                    <label class="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">Editorial Quote / Philosophy</label>
                    <input type="text" name="quote" placeholder="e.g. An entrance designed to calm the mind immediately." class="w-full bg-black/30 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880]">
                </div>

                <div class="flex items-center space-x-3 pt-2">
                    <input type="checkbox" id="createFeatured" name="is_featured" value="1" class="w-4 h-4 accent-[#C5A880] rounded">
                    <label for="createFeatured" class="text-xs text-white/80 cursor-pointer">Mark as Featured Residence badge on website</label>
                </div>

                <div class="pt-4 border-t border-white/10 flex justify-end space-x-3">
                    <button type="button" onclick="closeModal('createModal')" class="px-5 py-2.5 rounded-lg border border-white/10 text-xs font-semibold uppercase hover:bg-white/5 transition">
                        Cancel
                    </button>
                    <button type="submit" class="px-6 py-2.5 rounded-lg bg-[#C5A880] text-[#141311] text-xs font-semibold tracking-wider uppercase hover:bg-[#d8bc94] transition">
                        Save & Publish Image
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- EDIT / ALTER MODAL -->
    <div id="editModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm hidden items-center justify-center p-4 overflow-y-auto">
        <div class="bg-[#1C1B18] border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
            <button onclick="closeModal('editModal')" class="absolute top-5 right-5 text-white/50 hover:text-white text-2xl leading-none">&times;</button>
            <h2 class="font-serif text-2xl text-white mb-1">Edit / Alter Gallery Image</h2>
            <p class="text-xs text-white/50 font-mono mb-6">Replace photo or update descriptions & categories</p>

            <form id="editForm" method="POST" enctype="multipart/form-data" class="space-y-4">
                @csrf
                @method('PUT')

                <!-- Current & Replacement Image Preview -->
                <div>
                    <label class="block text-xs font-mono uppercase tracking-wider text-[#C5A880] mb-1.5">Change Image File (Optional)</label>
                    <div class="border-2 border-dashed border-white/20 hover:border-[#C5A880] rounded-xl p-4 text-center cursor-pointer transition relative bg-black/20" onclick="document.getElementById('editImageInput').click()">
                        <input type="file" id="editImageInput" name="image" accept="image/*" class="hidden" onchange="previewImage(this, 'editImagePreview')">
                        <img id="editImagePreview" class="w-full max-h-56 object-cover rounded-lg mx-auto mb-2" />
                        <p class="text-xs text-white/60">Click here if you want to replace with a new image file</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">Project Title *</label>
                        <input type="text" id="editTitle" name="title" required class="w-full bg-black/30 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880]">
                    </div>

                    <div>
                        <label class="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">Category *</label>
                        <select id="editCategory" name="category" required class="w-full bg-[#141311] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880]">
                            <option value="LIVING">LIVING (Living Room / Pavilion)</option>
                            <option value="KITCHEN">KITCHEN (Gourmet / Modular)</option>
                            <option value="BEDROOM">BEDROOM (Master / Guest Suite)</option>
                            <option value="JOINERY">JOINERY (Wardrobes / Custom Millwork)</option>
                            <option value="BATH">BATH (Spa Retreat / Powder Room)</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">Location</label>
                        <input type="text" id="editLocation" name="location" class="w-full bg-black/30 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880]">
                    </div>

                    <div>
                        <label class="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">Grid Span Layout</label>
                        <select id="editSpanClasses" name="span_classes" class="w-full bg-[#141311] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880]">
                            <option value="col-span-1 md:col-span-2 row-span-2">Standard (2 Columns)</option>
                            <option value="col-span-1 md:col-span-3 row-span-2">Wide Bento (3 Columns)</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">Display Order</label>
                        <input type="number" id="editOrderNum" name="order_num" class="w-full bg-black/30 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880]">
                    </div>
                    <div class="flex items-center space-x-3 pt-6">
                        <input type="checkbox" id="editFeatured" name="is_featured" value="1" class="w-4 h-4 accent-[#C5A880] rounded">
                        <label for="editFeatured" class="text-xs text-white/80 cursor-pointer">Mark as Featured Residence</label>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">Architectural Description</label>
                    <textarea id="editDescription" name="description" rows="2" class="w-full bg-black/30 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880]"></textarea>
                </div>

                <div>
                    <label class="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">Editorial Quote / Philosophy</label>
                    <input type="text" id="editQuote" name="quote" class="w-full bg-black/30 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880]">
                </div>

                <div class="pt-4 border-t border-white/10 flex justify-end space-x-3">
                    <button type="button" onclick="closeModal('editModal')" class="px-5 py-2.5 rounded-lg border border-white/10 text-xs font-semibold uppercase hover:bg-white/5 transition">
                        Cancel
                    </button>
                    <button type="submit" class="px-6 py-2.5 rounded-lg bg-[#C5A880] text-[#141311] text-xs font-semibold tracking-wider uppercase hover:bg-[#d8bc94] transition">
                        Update Gallery Item
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- JavaScript Helpers for Modals & Previews -->
    <script>
        function openModal(id) {
            const modal = document.getElementById(id);
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeModal(id) {
            const modal = document.getElementById(id);
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }

        function previewImage(input, previewId) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.getElementById(previewId);
                    img.src = e.target.result;
                    img.classList.remove('hidden');

                    const placeholder = document.getElementById('createImagePlaceholder');
                    if (placeholder && previewId === 'createImagePreview') {
                        placeholder.classList.add('hidden');
                    }
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        function openEditModal(item) {
            const form = document.getElementById('editForm');
            form.action = `/admin/gallery/${item.id}`;

            document.getElementById('editTitle').value = item.title || '';
            document.getElementById('editCategory').value = (item.category || 'LIVING').toUpperCase();
            document.getElementById('editLocation').value = item.location || '';
            document.getElementById('editSpanClasses').value = item.span_classes || 'col-span-1 md:col-span-2 row-span-2';
            document.getElementById('editOrderNum').value = item.order_num || 1;
            document.getElementById('editDescription').value = item.description || '';
            document.getElementById('editQuote').value = item.quote || '';
            document.getElementById('editFeatured').checked = !!item.is_featured;

            const preview = document.getElementById('editImagePreview');
            preview.src = item.image_url;
            preview.classList.remove('hidden');

            openModal('editModal');
        }
    </script>
</body>
</html>
