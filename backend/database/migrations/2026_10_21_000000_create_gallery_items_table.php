<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gallery_items', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category')->default('LIVING'); // LIVING, KITCHEN, BEDROOM, BATH, JOINERY
            $table->string('location')->nullable();
            $table->string('image_path');
            $table->text('description')->nullable();
            $table->text('quote')->nullable();
            $table->string('span_classes')->default('col-span-1 md:col-span-2 row-span-2');
            $table->boolean('is_featured')->default(false);
            $table->integer('order_num')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallery_items');
    }
};
