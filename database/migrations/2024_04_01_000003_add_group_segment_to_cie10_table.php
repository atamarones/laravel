<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('cie10', function (Blueprint $table) {
            $table->string('group', 255)->nullable()->after('description');
            $table->string('segment', 255)->nullable()->after('group');
        });
    }

    public function down()
    {
        Schema::table('cie10', function (Blueprint $table) {
            $table->dropColumn(['group', 'segment']);
        });
    }
}; 