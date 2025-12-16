import React, { useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import { Head, usePage, router, useForm } from '@inertiajs/react';
import { Search, Plus, ArrowLeft, Download, Save, Calendar, Scale, DollarSign, User, Trash2, Edit2, FileText } from 'lucide-react';

export default function PendingPayments() {
    const { customers, customer, milkEntries } = usePage().props;
    const [view, setView] = useState(customer ? 'detail' : 'list');
    const [selectedCustomer, setSelectedCustomer] = useState(customer || null);
    const [searchTerm, setSearchTerm] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const [showAddCustomer, setShowAddCustomer] = useState(false);

    // Form for adding customer
    const customerForm = useForm({
        name: '',
        notes: '',
    });

    // Form for milk entries
    const milkForm = useForm({
        customer_id: selectedCustomer?.id || '',
        entries: milkEntries || [],
    });

    const filteredCustomers = (customers || []).filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddCustomer = (e) => {
        e.preventDefault();
        customerForm.post(route('pending-payments.customer.store'), {
            onSuccess: () => {
                setSuccessMessage('Customer added successfully!');
                customerForm.reset();
                setShowAddCustomer(false);
                setTimeout(() => setSuccessMessage(''), 3000);
            },
            onError: (errors) => {
                console.error('Form errors:', errors);
            },
        });
    };

    const handleCustomerClick = (customer) => {
        router.get(route('pending-payments.customer', customer.id));
    };

    const handleAddMilkEntry = () => {
        const newEntry = {
            id: Date.now(),
            entry_date: new Date().toISOString().split('T')[0],
            milk_kg: '',
            milk_grams: '',
            amount: '',
            notes: '',
        };
        milkForm.setData('entries', [...(milkForm.data.entries || []), newEntry]);
    };

    const handleMilkEntryChange = (id, field, value) => {
        const updatedEntries = milkForm.data.entries.map(entry =>
            entry.id === id ? { ...entry, [field]: value } : entry
        );
        milkForm.setData('entries', updatedEntries);
    };

    const handleDeleteEntry = (id) => {
        const updatedEntries = milkForm.data.entries.filter(entry => entry.id !== id);
        milkForm.setData('entries', updatedEntries);
    };

    const handleSave = (e) => {
        e.preventDefault();
        milkForm.setData('customer_id', selectedCustomer.id);
        
        // Filter out empty entries
        const validEntries = milkForm.data.entries.filter(entry => 
            entry.milk_kg || entry.amount
        );
        milkForm.setData('entries', validEntries);

        milkForm.post(route('pending-payments.milk-entry.store'), {
            onSuccess: () => {
                setSuccessMessage('Milk entries saved successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            },
            onError: (errors) => {
                console.error('Form errors:', errors);
            },
        });
    };

    const handleDownloadReport = () => {
        router.get(route('pending-payments.report', selectedCustomer.id), {}, {
            onSuccess: () => {
                setSuccessMessage('Report downloaded successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            },
        });
    };

    const handleBackToList = () => {
        router.get(route('pending-payments'));
    };

    const handleDeleteEntryBackend = (entryId) => {
        if (confirm('Are you sure you want to delete this milk entry?')) {
            router.delete(route('pending-payments.milk-entry.destroy', entryId), {
                onSuccess: () => {
                    setSuccessMessage('Milk entry deleted successfully!');
                    setTimeout(() => setSuccessMessage(''), 3000);
                },
                onError: (errors) => {
                    console.error('Delete errors:', errors);
                },
            });
        }
    };

    return (
        <DashboardLayout title="Pending Payments - Mehmood Cattle and Dairy Farm">
            <Head title="Pending Payments" />
            
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Success Message */}
                {successMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                        {successMessage}
                    </div>
                )}

                {view === 'list' ? (
                    /* Customer List View */
                    <div>
                        {/* Header */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Pending Payments</h1>
                                    <p className="text-gray-600 mt-1">Manage customer milk payments and records</p>
                                </div>
                                
                                <button
                                    onClick={() => setShowAddCustomer(true)}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Add Customer</span>
                                </button>
                            </div>
                            
                            {/* Search Bar */}
                            <div className="mt-6">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search customers..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Add Customer Form */}
                        {showAddCustomer && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Add New Customer</h3>
                                    <button
                                        onClick={() => setShowAddCustomer(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <form onSubmit={handleAddCustomer} className="flex gap-3">
                                    <input
                                        type="text"
                                        placeholder="Enter customer name"
                                        value={customerForm.data.name}
                                        onChange={(e) => customerForm.setData('name', e.target.value)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    />
                                    <button
                                        type="submit"
                                        disabled={customerForm.processing}
                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors"
                                    >
                                        {customerForm.processing ? 'Adding...' : 'Add Customer'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Customer Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredCustomers.map((customer) => (
                                <div
                                    key={customer.id}
                                    onClick={() => handleCustomerClick(customer)}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-green-300 transition-all duration-200 cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                                <User className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{customer.total_entries} entries</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-green-600">Rs. {parseFloat(customer.total_amount || 0).toLocaleString()}</p>
                                            <p className="text-xs text-gray-500">{customer.last_payment_date || 'No payments'}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Last payment</span>
                                            <span className="text-sm font-medium text-gray-900">{customer.last_payment_date || 'No payments'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredCustomers.length === 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
                                <p className="text-gray-500">Get started by adding your first customer</p>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Customer Detail View */
                    <div>
                        {/* Header */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={handleBackToList}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">{selectedCustomer?.name}</h1>
                                        <p className="text-gray-600 mt-1">Customer milk payment records</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={handleDownloadReport}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Download Report</span>
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Save</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Entries</p>
                                        <p className="text-2xl font-bold text-gray-900">{selectedCustomer?.total_entries || 0}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Scale className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Milk (KG)</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {(milkEntries || []).reduce((sum, entry) => sum + (parseFloat(entry.milk_kg) || 0), 0).toFixed(1)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <DollarSign className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Amount</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            Rs. {parseFloat(selectedCustomer?.total_amount || 0).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Milk Entries Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">Daily Milk Details</h2>
                                    <button
                                        onClick={handleAddMilkEntry}
                                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-1"
                                    >
                                        <Plus className="w-3 h-3" />
                                        <span>Add Entry</span>
                                    </button>
                                </div>
                            </div>
                            
                            <form onSubmit={handleSave}>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Milk Quantity (KG)</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Milk Quantity (Grams)</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (Rs.)</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {(milkForm.data.entries || []).map((entry) => (
                                                <tr key={entry.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center space-x-2">
                                                            <Calendar className="w-4 h-4 text-gray-400" />
                                                            <input
                                                                type="date"
                                                                value={entry.entry_date}
                                                                onChange={(e) => handleMilkEntryChange(entry.id, 'entry_date', e.target.value)}
                                                                className="block px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center space-x-2">
                                                            <Scale className="w-4 h-4 text-gray-400" />
                                                            <input
                                                                type="number"
                                                                value={entry.milk_kg}
                                                                onChange={(e) => handleMilkEntryChange(entry.id, 'milk_kg', e.target.value)}
                                                                placeholder="0.0"
                                                                step="0.1"
                                                                className="block w-20 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <input
                                                            type="number"
                                                            value={entry.milk_grams}
                                                            onChange={(e) => handleMilkEntryChange(entry.id, 'milk_grams', e.target.value)}
                                                            placeholder="0"
                                                            step="1"
                                                            max="999"
                                                            className="block w-20 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-gray-600">Rs.</span>
                                                            <input
                                                                type="number"
                                                                value={entry.amount}
                                                                onChange={(e) => handleMilkEntryChange(entry.id, 'amount', e.target.value)}
                                                                placeholder="0"
                                                                step="1"
                                                                className="block w-24 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {entry.id && typeof entry.id === 'number' ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteEntry(entry.id)}
                                                                className="text-red-600 hover:text-red-800"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteEntryBackend(entry.id)}
                                                                className="text-red-600 hover:text-red-800"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
