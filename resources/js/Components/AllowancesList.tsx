import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { useERC20 } from '@/hooks/useERC20';
import { useAccount } from 'wagmi';
import Modal from '@/Components/Modal';
import copyToClipboard from '@/Components/CopyToClipboard';

interface Allowance {
    id: number;
    contract_address: string;
    owner_address: string;
    spender_address: string;
    allowance_amount: string;
}

interface Props {
    initialAllowances: Allowance[];
    onUpdate?: () => Promise<void>;
}

export default function AllowancesList({ initialAllowances, onUpdate }: Props) {
    const [allowances, setAllowances] = useState<Allowance[]>(initialAllowances);
    const [editingAllowance, setEditingAllowance] = useState<Allowance | null>(null);
    const [newAmount, setNewAmount] = useState('');
    const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
    const { approve, revoke } = useERC20();
    const page = usePage();
    const { address } = useAccount();

    // Update allowances when props change
    useEffect(() => {
        if (initialAllowances) {
            setAllowances([...initialAllowances]);
        }
    }, [initialAllowances]);

    // Format address for display: 0x1234...5678
    const truncateAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };
    
    // Handle edit modal opening
    const handleEditClick = (allowance: Allowance) => {
        setEditingAllowance(allowance);
    };

    // Update allowance amount on blockchain and database
    const handleEditSubmit = async () => {
        if (!editingAllowance) return;
        const key = `edit-${editingAllowance.id}`;
        setLoadingStates(prev => ({ ...prev, [key]: true }));

        try {
            // First update blockchain
            await approve(
                editingAllowance.contract_address,
                editingAllowance.spender_address,
                newAmount
            );

            // Then update database
            await router.put(route('allowances.update', editingAllowance.id), {
                allowance_amount: newAmount
            });

            setEditingAllowance(null);
            onUpdate ? await onUpdate() : router.reload();
        } catch (error) {
            console.error('Edit error:', error);
        } finally {
            setLoadingStates(prev => ({ ...prev, [key]: false }));
        }
    };

    // Revoke allowance on blockchain
    const handleRevoke = async (allowance: Allowance) => {
        const key = `revoke-${allowance.id}`;
        setLoadingStates(prev => ({ ...prev, [key]: true }));
        try {
            await revoke(allowance.contract_address, allowance.spender_address);
            if (onUpdate) await onUpdate();
        } catch (error) {
            console.error('Revoke error:', error);
        } finally {
            setLoadingStates(prev => ({ ...prev, [key]: false }));
        }
    };

    // Remove allowance from tracking (database only)
    const handleDelete = async (allowance: Allowance) => {
        const key = `delete-${allowance.id}`;
        setLoadingStates(prev => ({ ...prev, [key]: true }));
        try {
            await router.delete(route('allowances.destroy', allowance.id));
            setAllowances(current => current.filter(a => a.id !== allowance.id));
        } catch (error) {
            console.error('Delete error:', error);
        } finally {
            setLoadingStates(prev => ({ ...prev, [key]: false }));
        }
    };

    // Check if connected wallet is the allowance owner
    const isOwner = (allowance: Allowance) => {
        return address?.toLowerCase() === allowance.owner_address.toLowerCase();
    };

    return (
        <div className="overflow-x-auto">
            <table className="allowances-table w-full">
                <thead>
                    <tr>
                        <th className="px-6 py-3">Contract</th>
                        <th className="px-6 py-3">Owner</th>
                        <th className="px-6 py-3">Spender</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allowances.map((allowance) => (
                        <tr key={`${allowance.contract_address}-${allowance.owner_address}-${allowance.spender_address}`}>
                            <td className="px-6 py-4">
                                <button 
                                    onClick={(e) => copyToClipboard(e, allowance.contract_address)}
                                    className="truncated-address"
                                >
                                    {truncateAddress(allowance.contract_address)}
                                </button>
                            </td>
                            <td className="px-6 py-4">
                                <button 
                                    onClick={(e) => copyToClipboard(e, allowance.owner_address)}
                                    className="truncated-address"
                                >
                                    {truncateAddress(allowance.owner_address)}
                                </button>
                            </td>
                            <td className="px-6 py-4">
                                <button 
                                    onClick={(e) => copyToClipboard(e, allowance.spender_address)}
                                    className="truncated-address"
                                >
                                    {truncateAddress(allowance.spender_address)}
                                </button>
                            </td>
                            <td className="px-6 py-4">
                                {allowance.allowance_amount}
                            </td>
                            <td className="px-6 py-4">
                                <div className="button-group">
                                    {isOwner(allowance) ? (
                                        <>
                                            <button
                                                onClick={() => handleEditClick(allowance)}
                                                disabled={loadingStates[`edit-${allowance.id}`]}
                                                className="login-button"
                                            >
                                                {loadingStates[`edit-${allowance.id}`] ? 'Processing...' : 'Edit'}
                                            </button>
                                            <button
                                                onClick={() => handleRevoke(allowance)}
                                                disabled={loadingStates[`revoke-${allowance.id}`]}
                                                className="login-button"
                                            >
                                                {loadingStates[`revoke-${allowance.id}`] ? 'Processing...' : 'Revoke'}
                                            </button>
                                        </>
                                    ) : null}
                                    <button
                                        onClick={() => handleDelete(allowance)}
                                        disabled={loadingStates[`delete-${allowance.id}`]}
                                        className="login-button"
                                    >
                                        {loadingStates[`delete-${allowance.id}`] ? 'Processing...' : 'Delete'}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {(!allowances || allowances.length === 0) && (
                        <tr>
                            <td colSpan={5} className="text-center py-4 text-gray-500">
                                No allowances found. Add one to get started.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Modal show={!!editingAllowance} onClose={() => setEditingAllowance(null)}>
                <div className="card">
                    <h3 className="text-2xl font-semibold text-black mb-6">Edit Allowance Amount</h3>
                    <div className="form-container">
                        <div>
                            <label className="form-label">Contract Address</label>
                            <div className="text-gray-600">
                                {truncateAddress(editingAllowance?.contract_address || '')}
                            </div>
                        </div>

                        <div>
                            <label className="form-label">New Amount</label>
                            <input
                                type="text"
                                value={newAmount}
                                onChange={(e) => setNewAmount(e.target.value)}
                                className="form-input"
                                placeholder="Enter new amount..."
                            />
                        </div>

                        <div className="button-group justify-end pt-6">
                            <button
                                onClick={() => setEditingAllowance(null)}
                                className="grey-button"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                disabled={loadingStates[`edit-${editingAllowance?.id}`]}
                                className="login-button"
                            >
                                {loadingStates[`edit-${editingAllowance?.id}`] ? 'Processing...' : 'Update Amount'}
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}