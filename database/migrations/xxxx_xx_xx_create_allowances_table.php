<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('allowances', function (Blueprint $table) {
            $table->id();
            $table->string('contract_address');
            $table->string('owner_address');
            $table->string('spender_address');
            $table->string('allowance_amount');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('allowances');
    }
}; 