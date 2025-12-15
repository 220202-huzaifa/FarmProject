import AuthenticatedLayout from '@/Layouts/DashboardLayout';
import { Head, useForm } from '@inertiajs/react';

export default function MilkSale() {
    const { data, setData, post, processing, errors, reset } = useForm({
        sale_date: new Date().toISOString().split('T')[0],
        milk_kg: '',
        sale_amount: '',
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('milk-sale.store'), {
            onFinish: () => reset('milk_kg', 'sale_amount', 'notes'),
        });
    };

    const downloadMonthlyReport = () => {
        window.open('/milk-sale/monthly-report', '_blank');
    };

    return (
        <AuthenticatedLayout title="Milk Sale">
            <Head title="Milk Sale" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Add Sale Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white shadow-sm rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                Record Milk Sale
                            </h3>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label htmlFor="sale_date" className="block text-sm font-medium text-gray-700">
                                        Sale Date
                                    </label>
                                    <input
                                        type="date"
                                        id="sale_date"
                                        value={data.sale_date}
                                        onChange={(e) => setData('sale_date', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    {errors.sale_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.sale_date}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="milk_kg" className="block text-sm font-medium text-gray-700">
                                        Milk Sold (KG)
                                    </label>
                                    <input
                                        type="number"
                                        id="milk_kg"
                                        value={data.milk_kg}
                                        onChange={(e) => setData('milk_kg', e.target.value)}
                                        step="0.01"
                                        min="0"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Enter milk sold in KG"
                                    />
                                    {errors.milk_kg && (
                                        <p className="mt-1 text-sm text-red-600">{errors.milk_kg}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="sale_amount" className="block text-sm font-medium text-gray-700">
                                        Net Sale Amount ($)
                                    </label>
                                    <input
                                        type="number"
                                        id="sale_amount"
                                        value={data.sale_amount}
                                        onChange={(e) => setData('sale_amount', e.target.value)}
                                        step="0.01"
                                        min="0"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Enter sale amount"
                                    />
                                    {errors.sale_amount && (
                                        <p className="mt-1 text-sm text-red-600">{errors.sale_amount}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                                        Notes (Optional)
                                    </label>
                                    <textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        rows={3}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Any additional notes..."
                                    />
                                    {errors.notes && (
                                        <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Record Sale'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Summary and Reports */}
                <div className="lg:col-span-2">
                    <div className="space-y-6">
                        {/* Monthly Summary */}
                        <div className="bg-white shadow-sm rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                    Monthly Summary
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                                                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="ml-5 w-0 flex-1">
                                                <dl>
                                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                                        Total Milk Sold (This Month)
                                                    </dt>
                                                    <dd className="text-2xl font-bold text-blue-600">
                                                        3,245 KG
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="ml-5 w-0 flex-1">
                                                <dl>
                                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                                        Total Sale Amount (This Month)
                                                    </dt>
                                                    <dd className="text-2xl font-bold text-green-600">
                                                        $9,735.00
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button
                                        onClick={downloadMonthlyReport}
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Download Monthly Report
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Sales Records */}
                        <div className="bg-white shadow-sm rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                    Recent Sales Records
                                </h3>
                                <div className="overflow-hidden shadow border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Milk (KG)
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Amount ($)
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Price/KG
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Notes
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    2024-12-15
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    145.5
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    $436.50
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    $3.00
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    Regular customer
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    2024-12-14
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    152.0
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    $456.00
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    $3.00
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    -
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    2024-12-13
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    138.2
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    $414.60
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    $3.00
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    Bulk order
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
