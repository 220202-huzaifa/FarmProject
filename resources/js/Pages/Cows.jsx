import React from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Users, Plus, Edit2, Eye, Search, X } from 'lucide-react';

export default function Cows() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [cows, setCows] = useState([
        { id: 1, number: 'COW-001', name: 'Bessie', status: 'Active', notes: 'Healthy dairy cow' },
        { id: 2, number: 'COW-002', name: 'Daisy', status: 'Active', notes: 'High milk production' },
        { id: 3, number: 'COW-003', name: '', status: 'Inactive', notes: 'Under treatment' },
    ]);
    const [newCow, setNewCow] = useState({ number: '', name: '', notes: '' });

    const handleAddCow = () => {
        if (newCow.number) {
            setCows([...cows, { 
                id: cows.length + 1, 
                ...newCow, 
                status: 'Active' 
            }]);
            setNewCow({ number: '', name: '', notes: '' });
            setShowAddForm(false);
        }
    };

    const filteredCows = cows.filter(cow => 
        cow.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cow.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout title="Cow Details">
            <Head title="Cow Details" />
            
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Cow Management</h2>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search cows..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        
                        {/* Add Cow Button */}
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Cow</span>
                        </button>
                    </div>
                </div>

                {/* Add Cow Form */}
                {showAddForm && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Add New Cow</h3>
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cow Number</label>
                                    <input
                                        type="text"
                                        value={newCow.number}
                                        onChange={(e) => setNewCow({...newCow, number: e.target.value})}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="e.g., COW-004"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cow Name</label>
                                    <input
                                        type="text"
                                        value={newCow.name}
                                        onChange={(e) => setNewCow({...newCow, name: e.target.value})}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="e.g., Bessie"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                    <input
                                        type="text"
                                        value={newCow.notes}
                                        onChange={(e) => setNewCow({...newCow, notes: e.target.value})}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="Health notes..."
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={handleAddCow}
                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                                >
                                    Add Cow
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cows Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cow Number</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCows.map((cow) => (
                                    <tr key={cow.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cow.number}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cow.name || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                cow.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {cow.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{cow.notes || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-purple-600 hover:text-purple-900 mr-3">Edit</button>
                                            <button className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
