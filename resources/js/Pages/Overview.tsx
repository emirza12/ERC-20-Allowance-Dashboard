import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import AllowancesList from '@/Components/AllowancesList';
import Modal from '@/Components/Modal';
import { useERC20 } from '@/hooks/useERC20';
import { useAccount } from 'wagmi';

interface Allowance {
    id: number;
    contract_address: string;
    owner_address: string;
    spender_address: string;
    allowance_amount: string;
}

interface Props {
    allowances: Allowance[];
}

export default function Overview({ allowances: initialAllowances }: Props) {
    const { address } = useAccount();
    const [allowances, setAllowances] = useState(initialAllowances);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingAllowance, setEditingAllowance] = useState<Allowance | null>(null);
    const [newAmount, setNewAmount] = useState('');
    const { getAllowance } = useERC20();
    const [isLoading, setIsLoading] = useState(false);

    const updateAllowanceAmounts = async () => {
        try {
            setIsLoading(true);
            const updatedAllowances = await Promise.all(
                initialAllowances.map(async (allowance) => {
                    try {
                        const amount = await getAllowance(
                            allowance.contract_address,
                            allowance.owner_address,
                            allowance.spender_address
                        );
                        return { 
                            ...allowance, 
                            allowance_amount: amount !== null ? amount : allowance.allowance_amount 
                        };
                    } catch (error) {
                        console.error('Error updating allowance:', error);
                        return allowance;
                    }
                })
            );
            setAllowances(updatedAllowances);
        } catch (error) {
            console.error('Error updating allowances:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (address) {
            updateAllowanceAmounts();
            const interval = setInterval(updateAllowanceAmounts, 60000);
            return () => clearInterval(interval);
        }
    }, [address, initialAllowances]);

    if (!address) {
        return (
            <MainLayout>
                <Head title="Overview" />
                <div className="page-container">
                    <div className="content-container">
                        <div className="message message-error">
                            Please connect your wallet to view your allowances
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const handleEditSubmit = async () => {
        try {
            await router.put(route('allowances.update', editingAllowance?.id), {
                allowance_amount: newAmount
            });
            setShowEditModal(false);
            setEditingAllowance(null);
        } catch (error) {
            console.error('Edit error:', error);
        }
    };

    return (
        <MainLayout>
            <Head title="Overview" />
            <div className="page-container">
                <div className="content-container">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-black mb-6">Your Allowances</h1>
                            <p className="text-gray-600">Manage and monitor your token approvals</p>
                        </div>
                        <button 
                            onClick={updateAllowanceAmounts}
                            disabled={isLoading}
                            className={`grey-button ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="spinner" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                    Refreshing...
                                </span>
                            ) : 'Refresh Allowances'}
                        </button>
                    </div>

                    <div className="card">
                        <AllowancesList 
                            initialAllowances={allowances} 
                            onUpdate={updateAllowanceAmounts}
                        />
                    </div>
                </div>
            </div>

            <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Modify Allowance Amount
                    </h3>
                    <input
                        type="text"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
                        placeholder="Enter new amount..."
                    />
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-900"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleEditSubmit}
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                        >
                            Update Amount
                        </button>
                    </div>
                </div>
            </Modal>
        </MainLayout>
    );
}