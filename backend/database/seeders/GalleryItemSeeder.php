<?php

namespace Database\Seeders;

use App\Models\GalleryItem;
use Illuminate\Database\Seeder;

class GalleryItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'id' => 1,
                'title' => 'Double-Height Zen Living',
                'category' => 'LIVING',
                'location' => 'ECR Seaside, Chennai',
                'image_path' => 'gallery/hero-living.jpg',
                'span_classes' => 'col-span-1 md:col-span-2 row-span-2',
                'description' => 'Expansive double-height living room featuring warm oak panelling, integrated ambient cove lighting, and custom low-slung seating.',
                'quote' => 'Proportions tuned to coastal light and natural airflow.',
                'is_featured' => false,
                'order_num' => 1,
            ],
            [
                'id' => 2,
                'title' => 'Architectural Marble Kitchen',
                'category' => 'KITCHEN',
                'location' => 'Nungambakkam',
                'image_path' => 'gallery/project-kitchen.jpg',
                'span_classes' => 'col-span-1 md:col-span-2 row-span-2',
                'description' => 'Monolithic quartzite island with dark graphite matte cabinetry, flush appliances, and concealed pantry access.',
                'quote' => 'Precision engineering meets quiet architectural minimalism.',
                'is_featured' => false,
                'order_num' => 2,
            ],
            [
                'id' => 3,
                'title' => 'Primary Master Suite',
                'category' => 'BEDROOM',
                'location' => 'Boat Club Avenue',
                'image_path' => 'gallery/project-bedroom.jpg',
                'span_classes' => 'col-span-1 md:col-span-2 row-span-2',
                'description' => 'Serene bedroom sanctuary wrapped in fluted timber walls, tactile linen upholstery, and architectural recessed illumination.',
                'quote' => 'A restful atmosphere built around texture and light.',
                'is_featured' => false,
                'order_num' => 3,
            ],
            [
                'id' => 4,
                'title' => 'Bespoke Dining Pavilion',
                'category' => 'LIVING',
                'location' => 'Poes Garden',
                'image_path' => 'gallery/project-dining.jpg',
                'span_classes' => 'col-span-1 md:col-span-3 row-span-2',
                'description' => 'Custom brass brassier pendant lighting suspended over an 8-seater travertine dining table with full-height garden glass.',
                'quote' => 'A center for slow meals and unhurried conversation.',
                'is_featured' => false,
                'order_num' => 4,
            ],
            [
                'id' => 5,
                'title' => 'Walk-in Wardrobe System',
                'category' => 'JOINERY',
                'location' => 'Harrington Road',
                'image_path' => 'gallery/project-wardrobe.jpg',
                'span_classes' => 'col-span-1 md:col-span-3 row-span-2',
                'description' => 'Bronze-framed glass wardrobes with sensor-activated warm interior lighting, leather drawer inserts, and velvet display trays.',
                'quote' => 'Storage designed like a luxury boutique display.',
                'is_featured' => false,
                'order_num' => 5,
            ],
            [
                'id' => 6,
                'title' => 'Grand Entrance Foyer',
                'category' => 'LIVING',
                'location' => 'RA Puram',
                'image_path' => 'gallery/project-foyer.jpg',
                'span_classes' => 'col-span-1 md:col-span-2 row-span-2',
                'description' => 'Statuary marble floor inlay paired with vertical fluted teak wall panels and sculptural accent pedestals.',
                'quote' => 'An entrance designed to calm the mind immediately upon arrival.',
                'is_featured' => false,
                'order_num' => 6,
            ],
            [
                'id' => 7,
                'title' => 'Sanctuary Spa Bathroom',
                'category' => 'BATH',
                'location' => 'Alwarpet',
                'image_path' => 'gallery/project-bath.jpg',
                'span_classes' => 'col-span-1 md:col-span-2 row-span-2',
                'description' => 'Freestanding stone soak tub set against backlit travertine walls and warm oak vanity joinery.',
                'quote' => 'Daily rituals elevated by tactile natural stone.',
                'is_featured' => false,
                'order_num' => 7,
            ],
            [
                'id' => 8,
                'title' => 'Private Cinema & Lounge',
                'category' => 'LIVING',
                'location' => 'Kotturpuram',
                'image_path' => 'gallery/project_theater.png',
                'span_classes' => 'col-span-1 md:col-span-2 row-span-2',
                'description' => 'Acoustically optimized private lounge with plush velvet seating, dark timber wall baffles, and starburst ceiling lights.',
                'quote' => 'Immersive acoustic comfort and atmospheric warmth.',
                'is_featured' => false,
                'order_num' => 8,
            ],
            [
                'id' => 9,
                'title' => 'Artisan Wood Workshop',
                'category' => 'JOINERY',
                'location' => 'Adyar Studio',
                'image_path' => 'gallery/artisan_workshop.png',
                'span_classes' => 'col-span-1 md:col-span-3 row-span-2',
                'description' => 'Handcrafted millwork and custom furniture detailing crafted by master wood artisans.',
                'quote' => 'Crafted by master hands with precision joinery.',
                'is_featured' => false,
                'order_num' => 9,
            ],
            [
                'id' => 10,
                'title' => 'Gourmet Marble Kitchen & Bar',
                'category' => 'KITCHEN',
                'location' => 'Boat Club',
                'image_path' => 'gallery/spatial_joinery.png',
                'span_classes' => 'col-span-1 md:col-span-3 row-span-2',
                'description' => 'Integrated breakfast counter bar with fluted glass cabinetry and brushed brass accents.',
                'quote' => 'The social core of a contemporary residence.',
                'is_featured' => true,
                'order_num' => 10,
            ],
        ];

        foreach ($items as $item) {
            GalleryItem::updateOrCreate(['id' => $item['id']], $item);
        }
    }
}
