import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { useERC20 } from '@/hooks/useERC20';
import { useAccount } from 'wagmi';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

interface Allowance {
    id: number;
    contract_address: string;
    owner_address: string;
    spender_address: string;
    allowance_amount: string;
}

interface Props {
    initialAllowances: Allowance[];
}

export default function AllowancesList({ initialAllowances }: Props) {
    const [allowances, setAllowances] = useState<Allowance[]>(initialAllowances);
    const [editingAllowance, setEditingAllowance] = useState<Allowance | null>(null);
    const [newAmount, setNewAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { address } = useAccount();
    const { approve, revoke } = useERC20();
    const page = usePage();

    useEffect(() => {
        setAllowances(initialAllowances);
    }, [initialAllowances]);

    const truncateAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const copyToClipboard = async (e: React.MouseEvent, text: string) => {
        e.preventDefault();  // Prevent navigation
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for non-secure contexts
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
            }

            // Visual feedback
            const button = e.currentTarget as HTMLButtonElement;
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 1000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleEditClick = (allowance: Allowance) => {
        setEditingAllowance(allowance);
    };

    const handleEditSubmit = async () => {
        if (!editingAllowance) return;
        setIsLoading(true);

        try {
            await approve(
                editingAllowance.contract_address,
                editingAllowance.spender_address,
                newAmount
            );

            await router.put(route('allowances.update', editingAllowance.id), {
                allowance_amount: newAmount
            });

            setEditingAllowance(null);
            window.location.reload(); // Force le rechargement complet
        } catch (error) {
            console.error('Edit error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRevoke = async (allowance: Allowance) => {
        setIsLoading(true);
        try {
            await revoke(allowance.contract_address, allowance.spender_address);
            await router.delete(route('allowances.destroy', allowance.id));
            
            window.location.reload(); // Force le rechargement complet
        } catch (error) {
            console.error('Revoke error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="allowances-table min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contract
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Owner
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Spender
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {allowances.map((allowance) => (
                        <tr key={`${allowance.contract_address}-${allowance.spender_address}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button 
                                    onClick={(e) => copyToClipboard(e, allowance.contract_address)}
                                    className="text-gray-900 hover:text-orange-500 transition-colors cursor-pointer"
                                    title="Click to copy full address"
                                >
                                    {truncateAddress(allowance.contract_address)}
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button 
                                    onClick={(e) => copyToClipboard(e, allowance.owner_address)}
                                    className="text-gray-900 hover:text-orange-500 transition-colors"
                                    title="Click to copy"
                                >
                                    {truncateAddress(allowance.owner_address)}
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button 
                                    onClick={(e) => copyToClipboard(e, allowance.spender_address)}
                                    className="text-gray-900 hover:text-orange-500 transition-colors"
                                    title="Click to copy"
                                >
                                    {truncateAddress(allowance.spender_address)}
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                {allowance.allowance_amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditClick(allowance)}
                                        disabled={isLoading}
                                        className={`login-button ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isLoading ? 'Processing...' : 'Edit'}
                                    </button>
                                    <button
                                        onClick={() => handleRevoke(allowance)}
                                        disabled={isLoading}
                                        className={`login-button inverted ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isLoading ? 'Processing...' : 'Revoke'}
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

            <Modal
                show={!!editingAllowance}
                onClose={() => setEditingAllowance(null)}
            >
                <div className="p-8 bg-white rounded-lg">
                    <h3 className="text-2xl font-semibold text-black mb-6">
                        Edit Allowance Amount
                    </h3>
                    <div className="space-y-6">
                        {/* Contract Info */}
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Contract Address
                            </label>
                            <div className="text-gray-600">
                                {truncateAddress(editingAllowance?.contract_address || '')}
                            </div>
                        </div>

                        {/* Spender Info */}
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Spender Address
                            </label>
                            <div className="text-gray-600">
                                {truncateAddress(editingAllowance?.spender_address || '')}
                            </div>
                        </div>

                        {/* New Amount Input */}
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                New Amount
                            </label>
                            <input
                                type="text"
                                value={newAmount}
                                onChange={(e) => setNewAmount(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Enter new amount..."
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4 pt-6">
                            <button
                                onClick={() => setEditingAllowance(null)}
                                className="px-4 py-2 text-black hover:text-orange-500 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                disabled={isLoading}
                                className={`login-button ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? 'Processing...' : 'Update Amount'}
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}