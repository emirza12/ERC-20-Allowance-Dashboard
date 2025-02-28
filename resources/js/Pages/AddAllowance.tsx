import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState, useEffect } from 'react';
import { useERC20 } from '@/hooks/useERC20';
import { router } from '@inertiajs/react';
import { useAccount } from 'wagmi';
import { usePage } from '@inertiajs/react';

export default function AddAllowance() {
    const { address } = useAccount();
    const { getAllowance } = useERC20();
    const { approve } = useERC20();
    const [formData, setFormData] = useState({
        contract_address: '',
        spender_address: '',
        owner_address: address || '',
        allowance_amount: '0'
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { errors } = usePage().props;
    const page = usePage().props as any;

    useEffect(() => {
        if (errors.error) {
            setMessage(errors.error);
        }
    }, [errors]);

    if (!address) {
        return (
            <MainLayout>
                <Head title="Add Allowance" />
                <div className="page-container">
                    <div className="content-container">
                        <div className="message message-error">
                            Please connect your wallet to add allowances
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            // D'abord, vérifier si l'adresse du contrat est valide en essayant de récupérer l'allowance
            const currentAllowance = await getAllowance(
                formData.contract_address,
                formData.owner_address,
                formData.spender_address
            );

            // Ensuite, vérifier si l'allowance existe déjà
            const allowances = (page.allowances || []) as any[];
            const allowanceExists = allowances.some(allowance => 
                allowance.contract_address.toLowerCase() === formData.contract_address.toLowerCase() &&
                allowance.spender_address.toLowerCase() === formData.spender_address.toLowerCase() &&
                allowance.owner_address.toLowerCase() === formData.owner_address.toLowerCase()
            );

            if (allowanceExists) {
                setMessage('This allowance already exists in your dashboard');
                setIsLoading(false);
                return;
            }

            // Si tout est bon, ajouter l'allowance
            await router.post(route('allowances.store'), {
                contract_address: formData.contract_address,
                spender_address: formData.spender_address,
                owner_address: formData.owner_address,
                allowance_amount: currentAllowance
            });

            setMessage('Allowance successfully retrieved and added');
            
        } catch (error: any) {
            console.error('Error:', error);
            setMessage(error.message || 'Invalid ERC20 contract address or not an ERC20 token');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MainLayout>
            <Head title="Add Allowance" />
            <div className="page-container">
                <div className="content-container">
                    {message && (
                        <div className={`message ${message.includes('success') ? 'message-success' : 'message-error'}`}>
                            {message.includes('success') ? (
                                <svg className="message-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="message-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            )}
                            <span>{message}</span>
                        </div>
                    )}

                    <h2 className="text-4xl font-bold text-black mb-6">
                        Add New Allowance
                    </h2>
                    <div className="card">
                        <form onSubmit={handleSubmit} className="form-container">
                            <div>
                                <label className="form-label">Token Contract Address</label>
                                <input
                                    type="text"
                                    value={formData.contract_address}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        contract_address: e.target.value
                                    })}
                                    className="form-input"
                                    placeholder="0x..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="form-label">Spender Address</label>
                                <input
                                    type="text"
                                    value={formData.spender_address}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        spender_address: e.target.value
                                    })}
                                    className="form-input"
                                    placeholder="0x..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="form-label">Owner Address</label>
                                <input
                                    type="text"
                                    value={formData.owner_address}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        owner_address: e.target.value
                                    })}
                                    className="form-input"
                                    placeholder="0x..."
                                    required
                                />
                                <p className="form-helper">
                                    Pre-filled with your wallet address. Change it to monitor other addresses.
                                </p>
                            </div>

                            <div className="form-actions">
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
        </MainLayout>
    );
}