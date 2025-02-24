import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Home() {
    return (
        <MainLayout>
            <Head title="Home" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="heading-xlarge mb-6 text-black">
                            Allowance Dashboard
                        </h1>
                        <p className="text-xl text-gray-600">
                            Manage your ERC20 token approvals with ease
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* What is an allowance section */}
                        <div className="bg-white rounded-lg shadow-lg p-8 border border-black/10">
                            <h2 className="text-2xl font-semibold text-black mb-4">
                                What is an allowance?
                            </h2>
                            <p className="text-gray-600 mb-4">
                                An allowance is a permission you grant to a smart contract 
                                to spend your ERC20 tokens on your behalf. It's similar to 
                                giving power of attorney to a decentralized application (dApp) 
                                to use your tokens.
                            </p>
                            <p className="text-gray-600">
                                This feature is essential for many DeFi applications, 
                                but it's important to manage these permissions carefully 
                                for the security of your assets.
                            </p>
                        </div>

                        {/* Features section */}
                        <div className="bg-white rounded-lg shadow-lg p-8 border border-black/10">
                            <h2 className="text-2xl font-semibold text-black mb-4">
                                Features
                            </h2>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>View all your allowances at a glance</li>
                                <li>Easily modify approved amounts</li>
                                <li>Revoke unused permissions</li>
                                <li>Simple and intuitive interface</li>
                            </ul>
                        </div>

                        {/* About section */}
                        <div className="bg-white rounded-lg shadow-lg p-8 border border-black/10">
                            <h2 className="text-2xl font-semibold text-black mb-4">
                                About the Project
                            </h2>
                            <p className="text-gray-600 mb-4">
                                This project was developed by Eva MIRZA as part of an 
                                initiative to improve the security and management of 
                                ERC20 allowances on the Ethereum blockchain.
                            </p>
                            <div className="flex items-center justify-center mt-6">
                                <img 
                                    src="/images/kiln-logo.png" 
                                    alt="Kiln Logo" 
                                    className="h-12"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 