import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState } from 'react';
import { useERC20 } from '@/hooks/useERC20';
import { router } from '@inertiajs/react';

export default function AddAllowance() {
    const [formData, setFormData] = useState({
        contract_address: '',
        spender_address: '',
        allowance_amount: ''
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { approve } = useERC20();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await approve(
                formData.contract_address,
                formData.spender_address,
                formData.allowance_amount
            );

            await router.post(route('allowances.store'), formData);
            
            // Force le rechargement de la page
            window.location.href = route('overview');

        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to add allowance. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MainLayout>
            <Head title="Add Allowance" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    {message && (
                        <div className={`mb-4 p-4 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="p-8">
                            <h2 className="text-2xl font-semibold text-black mb-6">
                                Add New Allowance
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Token Contract Address
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.contract_address}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            contract_address: e.target.value
                                        })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0x..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Spender Address
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.spender_address}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            spender_address: e.target.value
                                        })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0x..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Amount
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.allowance_amount}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            allowance_amount: e.target.value
                                        })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Enter amount..."
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`login-button w-full justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isLoading ? 'Adding...' : 'Add Allowance'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}