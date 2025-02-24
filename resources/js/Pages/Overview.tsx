import { useEffect, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import AllowancesList from '@/Components/AllowancesList';
import Modal from '@/Components/Modal';

interface Allowance {
    id: number;
    contract_address: string;
    owner_address: string;
    spender_address: string;
    allowance_amount: string;
}

interface Props {
    allowances: Allowance[];
    showEditModal?: boolean;
    existingAllowance?: Allowance;
    warning?: string;
}

interface PageProps {
    flash: {
        showEditModal?: boolean;
        existingAllowance?: Allowance;
        warning?: string;
        success?: string;
    };
}

export default function Overview({ allowances, showEditModal: initialShowModal, existingAllowance: initialAllowance, warning }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [showEditModal, setShowEditModal] = useState(!!initialShowModal);
    const [editingAllowance, setEditingAllowance] = useState<Allowance | null>(initialAllowance || null);
    const [newAmount, setNewAmount] = useState('');

    useEffect(() => {
        if (initialShowModal && initialAllowance) {
            setEditingAllowance(initialAllowance);
            setShowEditModal(true);
        }
    }, [initialShowModal, initialAllowance]);

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

    // Recharger les données périodiquement
    useEffect(() => {
        const interval = setInterval(() => {
            router.get(route('overview'), {}, {
                preserveScroll: true,
                preserveState: true,
                only: ['allowances']
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <MainLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Overview</h2>}
        >
            <Head title="Overview" />

            {warning && (
                <div className="mb-4 p-4 bg-yellow-100 text-yellow-700 rounded-lg">
                    {warning}
                </div>
            )}

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-black mb-4">
                            Your Allowances
                        </h1>
                        <p className="text-gray-600">
                            Manage and monitor your token approvals
                        </p>
                    </div>

                    <div className={`bg-white rounded-lg shadow-lg border border-black/10 ${isLoading ? 'opacity-50' : ''}`}>
                        <AllowancesList initialAllowances={allowances} />
                    </div>
                </div>
            </div>

            <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Modify Allowance Amount
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        This allowance already exists. Enter a new amount to modify it.
                    </p>
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