<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\MilkEntry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendingPaymentController extends Controller
{
    public function index()
    {
        $customers = Customer::where('user_id', auth()->id())
            ->orderBy('last_payment_date', 'desc')
            ->get();

        return Inertia::render('PendingPayments', [
            'customers' => $customers,
        ]);
    }

    public function customerDetail($customerId)
    {
        $customer = Customer::where('user_id', auth()->id())
            ->with('milkEntries')
            ->findOrFail($customerId);

        return Inertia::render('PendingPayments', [
            'customer' => $customer,
            'milkEntries' => $customer->milkEntries()->orderBy('entry_date', 'desc')->get(),
        ]);
    }

    public function storeCustomer(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'notes' => 'nullable|string|max:1000',
        ]);

        $validated['user_id'] = auth()->id();

        Customer::create($validated);

        return redirect()->back()->with('success', 'Customer added successfully!');
    }

    public function storeMilkEntry(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'entries' => 'required|array',
            'entries.*.entry_date' => 'required|date|before_or_equal:today',
            'entries.*.milk_kg' => 'required|numeric|min:0|max:10000',
            'entries.*.milk_grams' => 'required|integer|min:0|max:999',
            'entries.*.amount' => 'required|numeric|min:0|max:100000',
            'entries.*.notes' => 'nullable|string|max:1000',
        ]);

        $customer = Customer::where('user_id', auth()->id())->findOrFail($validated['customer_id']);

        foreach ($validated['entries'] as $entry) {
            if (!empty($entry['milk_kg']) || !empty($entry['amount'])) {
                MilkEntry::create([
                    'user_id' => auth()->id(),
                    'customer_id' => $customer->id,
                    'entry_date' => $entry['entry_date'],
                    'milk_kg' => $entry['milk_kg'],
                    'milk_grams' => $entry['milk_grams'] ?? 0,
                    'amount' => $entry['amount'],
                    'notes' => $entry['notes'] ?? null,
                ]);
            }
        }

        $customer->updateTotals();

        return redirect()->back()->with('success', 'Milk entries saved successfully!');
    }

    public function updateMilkEntry(Request $request, $id)
    {
        $entry = MilkEntry::where('user_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'entry_date' => 'required|date|before_or_equal:today',
            'milk_kg' => 'required|numeric|min:0|max:10000',
            'milk_grams' => 'required|integer|min:0|max:999',
            'amount' => 'required|numeric|min:0|max:100000',
            'notes' => 'nullable|string|max:1000',
        ]);

        $entry->update($validated);
        $entry->customer->updateTotals();

        return redirect()->back()->with('success', 'Milk entry updated successfully!');
    }

    public function destroyMilkEntry($id)
    {
        $entry = MilkEntry::where('user_id', auth()->id())->findOrFail($id);
        $customer = $entry->customer;
        $entry->delete();
        $customer->updateTotals();

        return redirect()->back()->with('success', 'Milk entry deleted successfully!');
    }

    public function downloadReport($customerId)
    {
        $customer = Customer::where('user_id', auth()->id())
            ->with('milkEntries')
            ->findOrFail($customerId);

        // For now, return JSON - implement PDF/CSV later
        return response()->json([
            'customer' => $customer,
            'entries' => $customer->milkEntries,
            'total_amount' => $customer->total_amount,
            'total_entries' => $customer->total_entries,
        ]);
    }
}
