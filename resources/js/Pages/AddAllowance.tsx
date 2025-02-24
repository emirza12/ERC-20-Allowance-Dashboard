import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState, useEffect } from 'react';
import { useERC20 } from '@/hooks/useERC20';
import { router } from '@inertiajs/react';
import { useAccount } from 'wagmi';
import { usePage } from '@inertiajs/react';

export default function AddAllowance() {
    const { address } = useAccount();
    const [formData, setFormData] = useState({
        contract_address: '',
        spender_address: '',
        owner_address: address || '',
        allowance_amount: '0'
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { errors } = usePage().props;

    const { approve } = useERC20();

    useEffect(() => {
        // Afficher le message d'erreur du backend
        if (errors.error) {
            setMessage(errors.error);
        }
    }, [errors]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const dataToSend = {
                contract_address: formData.contract_address,
                spender_address: formData.spender_address,
                owner_address: address,
                allowance_amount: '0'
            };

            await router.post(route('allowances.store'), dataToSend, {
                preserveState: true,
                preserveScroll: true,
                onError: (errors) => {
                    if (errors.error) {
                        setMessage(errors.error);
                    }
                }
            });

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
                                        required
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
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Owner Address (Your Wallet)
                                    </label>
                                    <input
                                        type="text"
                                        value={address}
                                        disabled
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
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