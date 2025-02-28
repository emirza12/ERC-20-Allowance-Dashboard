<?php

namespace App\Http\Controllers;

use App\Models\Allowance;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AllowanceController extends Controller
{
    public function index()
    {
        return Inertia::render('Overview', [
            'allowances' => Allowance::orderBy('created_at', 'desc')->get()
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

        try {
            $existingAllowance = Allowance::where([
                'contract_address' => $validated['contract_address'],
                'spender_address' => $validated['spender_address'],
                'owner_address' => $validated['owner_address'],
            ])->first();

            if ($existingAllowance) {
                return redirect()->back()->withErrors([
                    'error' => 'This allowance already exists.'
                ]);
            }

            Allowance::create($validated);
            return redirect()->route('overview');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to save allowance.']);
        }
    }

    public function update(Request $request, Allowance $allowance)
    {
        $allowance->update($request->validate(['allowance_amount' => 'required|string']));
        return redirect()->route('overview');
    }

    public function destroy(Allowance $allowance)
    {
        $allowance->delete();
        return redirect()->route('overview');
    }
} 