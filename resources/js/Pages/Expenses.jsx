import DashboardLayout from '../Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { DollarSign, Car, Zap, Users, Home, Plus, X, Calendar, FileText } from 'lucide-react';

export default function Expenses() {
    const [activeTab, setActiveTab] = useState('petrol');
    const [successMessage, setSuccessMessage] = useState('');

    // Common expense form state
    const [petrolExpenses, setPetrolExpenses] = useState([
        { date: '', amount: '', description: '' }
    ]);
    const [electricityExpenses, setElectricityExpenses] = useState([
        { date: '', amount: '', description: '' }
    ]);
    const [employeeExpenses, setEmployeeExpenses] = useState([
        { date: '', amount: '', description: '' }
    ]);
    const [farmExpenses, setFarmExpenses] = useState([
        { expenseName: '', amount: '', date: '', description: '' }
    ]);

    const tabs = [
        { id: 'petrol', label: 'Petrol Expense', icon: Car },
        { id: 'electricity', label: 'Electricity Bill', icon: Zap },
        { id: 'employee', label: 'Employee Pay', icon: Users },
        { id: 'farm', label: 'Farm Expense', icon: Home },
    ];

    const addExpenseRow = (type) => {
        const newExpense = type === 'farm' 
            ? { expenseName: '', amount: '', date: '', description: '' }
            : { date: '', amount: '', description: '' };

        switch(type) {
            case 'petrol':
                setPetrolExpenses([...petrolExpenses, newExpense]);
                break;
            case 'electricity':
                setElectricityExpenses([...electricityExpenses, newExpense]);
                break;
            case 'employee':
                setEmployeeExpenses([...employeeExpenses, newExpense]);
                break;
            case 'farm':
                setFarmExpenses([...farmExpenses, newExpense]);
                break;
        }
    };

    const updateExpense = (type, index, field, value) => {
        switch(type) {
            case 'petrol':
                const updatedPetrol = [...petrolExpenses];
                updatedPetrol[index][field] = value;
                setPetrolExpenses(updatedPetrol);
                break;
            case 'electricity':
                const updatedElectricity = [...electricityExpenses];
                updatedElectricity[index][field] = value;
                setElectricityExpenses(updatedElectricity);
                break;
            case 'employee':
                const updatedEmployee = [...employeeExpenses];
                updatedEmployee[index][field] = value;
                setEmployeeExpenses(updatedEmployee);
                break;
            case 'farm':
                const updatedFarm = [...farmExpenses];
                updatedFarm[index][field] = value;
                setFarmExpenses(updatedFarm);
                break;
        }
    };

    const removeExpenseRow = (type, index) => {
        switch(type) {
            case 'petrol':
                setPetrolExpenses(petrolExpenses.filter((_, i) => i !== index));
                break;
            case 'electricity':
                setElectricityExpenses(electricityExpenses.filter((_, i) => i !== index));
                break;
            case 'employee':
                setEmployeeExpenses(employeeExpenses.filter((_, i) => i !== index));
                break;
            case 'farm':
                setFarmExpenses(farmExpenses.filter((_, i) => i !== index));
                break;
        }
    };

    const saveExpenses = (type) => {
        // Simulate save operation
        setSuccessMessage(`${tabs.find(tab => tab.id === type).label} saved successfully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
        
        // Reset form
        const resetExpense = type === 'farm' 
            ? { expenseName: '', amount: '', date: '', description: '' }
            : { date: '', amount: '', description: '' };

        switch(type) {
            case 'petrol':
                setPetrolExpenses([resetExpense]);
                break;
            case 'electricity':
                setElectricityExpenses([resetExpense]);
                break;
            case 'employee':
                setEmployeeExpenses([resetExpense]);
                break;
            case 'farm':
                setFarmExpenses([resetExpense]);
                break;
        }
    };

    const renderCommonExpenseForm = (expenses, type) => (
        <div className="space-y-4">
            {expenses.map((expense, index) => (
                <div key={index} className="flex items-end space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Date
                        </label>
                        <input
                            type="date"
                            value={expense.date}
                            onChange={(e) => updateExpense(type, index, 'date', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                        </label>
                        <input
                            type="number"
                            value={expense.amount}
                            onChange={(e) => updateExpense(type, index, 'amount', e.target.value)}
                            placeholder="0.00"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <input
                            type="text"
                            value={expense.description}
                            onChange={(e) => updateExpense(type, index, 'description', e.target.value)}
                            placeholder="Enter description"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    
                    {expenses.length > 1 && (
                        <button
                            onClick={() => removeExpenseRow(type, index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            ))}
            
            <div className="flex justify-between">
                <button
                    onClick={() => addExpenseRow(type)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add More Expense</span>
                </button>
                
                <button
                    onClick={() => saveExpenses(type)}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                    Save Expenses
                </button>
            </div>
        </div>
    );

    const renderFarmExpenseForm = () => (
        <div className="space-y-4">
            {farmExpenses.map((expense, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expense Name
                        </label>
                        <input
                            type="text"
                            value={expense.expenseName}
                            onChange={(e) => updateExpense('farm', index, 'expenseName', e.target.value)}
                            placeholder="e.g., Feed, Medicine"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                        </label>
                        <input
                            type="number"
                            value={expense.amount}
                            onChange={(e) => updateExpense('farm', index, 'amount', e.target.value)}
                            placeholder="0.00"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date Picker
                        </label>
                        <input
                            type="date"
                            value={expense.date}
                            onChange={(e) => updateExpense('farm', index, 'date', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    
                    <div className="flex items-end space-x-2">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <input
                                type="text"
                                value={expense.description}
                                onChange={(e) => updateExpense('farm', index, 'description', e.target.value)}
                                placeholder="Details"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        
                        {farmExpenses.length > 1 && (
                            <button
                                onClick={() => removeExpenseRow('farm', index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            ))}
            
            <div className="flex justify-between">
                <button
                    onClick={() => addExpenseRow('farm')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add More Expense</span>
                </button>
                
                <button
                    onClick={() => saveExpenses('farm')}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                    Save Expenses
                </button>
            </div>
        </div>
    );

    return (
        <DashboardLayout title="Expenses">
            <Head title="Expenses" />
            
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <DollarSign className="w-5 h-5 text-orange-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Expense Management</h2>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-600">{successMessage}</p>
                    </div>
                )}

                {/* Expense Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6" aria-label="Tabs">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                            activeTab === tab.id
                                                ? 'border-orange-500 text-orange-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'petrol' && renderCommonExpenseForm(petrolExpenses, 'petrol')}
                        {activeTab === 'electricity' && renderCommonExpenseForm(electricityExpenses, 'electricity')}
                        {activeTab === 'employee' && renderCommonExpenseForm(employeeExpenses, 'employee')}
                        {activeTab === 'farm' && renderFarmExpenseForm()}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
