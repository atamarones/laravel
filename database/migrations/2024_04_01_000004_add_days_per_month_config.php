<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        DB::table('configurations')->insert([
            'key' => 'days_per_month',
            'value' => '30',
            'description' => 'Número de días por mes para cálculos de ausencias',
            'group' => 'absences',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }

    public function down()
    {
        DB::table('configurations')->where('key', 'days_per_month')->delete();
    }
}; 