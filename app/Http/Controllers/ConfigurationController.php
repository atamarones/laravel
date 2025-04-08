<?php

namespace App\Http\Controllers;

use App\Models\Configuration;
use Illuminate\Http\Request;

class ConfigurationController extends Controller
{
    public function getValue($key)
    {
        $config = Configuration::where('key', $key)->first();
        
        if (!$config) {
            return response()->json(['error' => 'Configuration not found'], 404);
        }

        return response()->json($config);
    }
} 