<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('absences', function (Blueprint $table) {
            $table->foreignId('cie10_id')->nullable()->after('absence_type_id')->constrained('cie10')->nullOnDelete();
            $table->decimal('hours', 8, 2)->nullable()->after('end_date');
            $table->decimal('absence_days', 8, 2)->nullable()->after('hours');
            $table->decimal('absence_value', 15, 2)->nullable()->after('absence_days');
        });
    }

    public function down()
    {
        Schema::table('absences', function (Blueprint $table) {
            $table->dropForeign(['cie10_id']);
            $table->dropColumn(['cie10_id', 'hours', 'absence_days', 'absence_value']);
        });
    }
}; 