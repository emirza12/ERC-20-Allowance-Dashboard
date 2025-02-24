<?php

namespace App\Http\Controllers;

use App\Models\Allowance;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AllowanceController extends Controller
{
    public function index()
    {
        // Récupérer les allowances triées par date de création
        $allowances = Allowance::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Overview', [
            'allowances' => $allowances
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'contract_address' => 'required|string',
            'spender_address' => 'required|string',
            'allowance_amount' => 'required|string',
            'owner_address' => 'required|string',
        ]);

        $existingAllowance = Allowance::where([
            'contract_address' => $validated['contract_address'],
            'spender_address' => $validated['spender_address'],
            'owner_address' => $validated['owner_address'],
        ])->first();

        if ($existingAllowance) {
            $existingAllowance->update([
                'allowance_amount' => $validated['allowance_amount']
            ]);
        } else {
            Allowance::create($validated);
        }

        // Rediriger avec un rechargement forcé
        return redirect()->route('overview')->with([
            'message' => $existingAllowance ? 'Allowance updated successfully!' : 'Allowance added successfully!',
            'forceReload' => true
        ]);
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