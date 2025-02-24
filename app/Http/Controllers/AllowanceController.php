<?php

namespace App\Http\Controllers;

use App\Models\Allowance;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AllowanceController extends Controller
{
    public function index()
    {
        try {
            $allowances = Allowance::orderBy('created_at', 'desc')->get();
            \Log::info('Fetched allowances:', ['count' => $allowances->count()]);
            
            return Inertia::render('Overview', [
                'allowances' => $allowances
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching allowances:', ['error' => $e->getMessage()]);
            return Inertia::render('Overview', [
                'allowances' => []
            ]);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'contract_address' => 'required|string',
            'spender_address' => 'required|string',
            'allowance_amount' => 'required|string',
            'owner_address' => 'required|string',
        ]);

        try {
            // Créer une nouvelle allowance sans vérifier l'existence
            $allowance = Allowance::create($validated);

            // Log pour le débogage
            \Log::info('New allowance created:', $allowance->toArray());

            return redirect()->route('overview')->with([
                'message' => 'Allowance added successfully!',
                'allowance' => $allowance
            ]);

        } catch (\Exception $e) {
            \Log::error('Error creating allowance:', [
                'error' => $e->getMessage(),
                'data' => $validated
            ]);

            return redirect()->back()->withErrors(['error' => 'Failed to save allowance.']);
        }
    }

    public function update(Request $request, Allowance $allowance)
    {
        $validated = $request->validate([
            'allowance_amount' => 'required|string',
        ]);

        $allowance->update($validated);

        return redirect()->route('allowances.index');
    }

    public function destroy(Allowance $allowance)
    {
        $allowance->delete();
        return redirect()->route('allowances.index');
    }
} 