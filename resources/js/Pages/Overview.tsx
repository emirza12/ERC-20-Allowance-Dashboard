import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import AllowancesList from '@/Components/AllowancesList';

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

export default function Overview({ allowances }: Props) {
    return (
        <MainLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Overview</h2>}
        >
            <Head title="Overview" />

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

                    <div className="bg-white rounded-lg shadow-lg border border-black/10">
                        <AllowancesList initialAllowances={allowances} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}