import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { useERC20 } from '@/hooks/useERC20';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

interface AllowanceFormProps {
    defaultOwnerAddress?: string;
}

export default function AllowanceForm({ defaultOwnerAddress }: AllowanceFormProps) {
    const { approve } = useERC20();
    const { data, setData, post, processing, errors } = useForm({
        contract_address: '',
        owner_address: defaultOwnerAddress || '',
        spender_address: '',
        allowance_amount: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Approve on blockchain first
            await approve(
                data.contract_address,
                data.spender_address,
                data.allowance_amount
            );

            // Then save to database
            post(route('allowances.store'));
        } catch (error) {
            console.error('Approval error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="contract_address" value="Contract Address" />
                <TextInput
                    id="contract_address"
                    type="text"
                    value={data.contract_address}
                    className="mt-1 block w-full"
                    onChange={e => setData('contract_address', e.target.value)}
                    required
                />
                <InputError message={errors.contract_address} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="owner_address" value="Owner Address" />
                <TextInput
                    id="owner_address"
                    type="text"
                    value={data.owner_address}
                    className="mt-1 block w-full"
                    onChange={e => setData('owner_address', e.target.value)}
                    required
                />
                <InputError message={errors.owner_address} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="spender_address" value="Spender Address" />
                <TextInput
                    id="spender_address"
                    type="text"
                    value={data.spender_address}
                    className="mt-1 block w-full"
                    onChange={e => setData('spender_address', e.target.value)}
                    required
                />
                <InputError message={errors.spender_address} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="allowance_amount" value="Allowance Amount" />
                <TextInput
                    id="allowance_amount"
                    type="text"
                    value={data.allowance_amount}
                    className="mt-1 block w-full"
                    onChange={e => setData('allowance_amount', e.target.value)}
                    required
                />
                <InputError message={errors.allowance_amount} className="mt-2" />
            </div>

            <div className="flex items-center justify-end">
                <PrimaryButton type="submit" disabled={processing}>
                    Add Allowance
                </PrimaryButton>
            </div>
        </form>
    );
}