import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Home() {
    return (
        <MainLayout>
            <Head title="Home" />
            
            <div className="page-container">
                <div className="content-container">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-black mb-6">
                            ERC-20 Allowance Dashboard
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Manage your ERC-20 token allowances securely and efficiently on the Holesky network
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="card h-full">
                            <h2 className="text-2xl font-semibold text-black mb-4">
                                What is an Allowance?
                            </h2>
                            <p className="text-gray-600">
                                An allowance in ERC-20 tokens is a permission you grant to another address 
                                to spend tokens on your behalf. This mechanism is essential for DeFi protocols 
                                and dApps, enabling automated token transfers while maintaining security.
                            </p>
                        </div>

                        <div className="card h-full">
                            <h2 className="text-2xl font-semibold text-black mb-4">
                                Key Features
                            </h2>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li><strong>Track:</strong> Real-time allowance monitoring with auto-updates</li>
                                <li><strong>Monitor:</strong> Track any address allowances on Holesky</li>
                                <li><strong>Edit/Revoke:</strong> Manage your owned allowances securely</li>
                                <li><strong>Delete:</strong> Remove from dashboard without blockchain changes</li>
                            </ul>
                        </div>

                        <div className="card h-full">
                            <h2 className="text-2xl font-semibold text-black mb-4">
                                Getting Started
                            </h2>
                            <div className="text-gray-600 space-y-2">
                                <p>1. Connect your wallet using the top-right button</p>
                                <p>2. Navigate to "Add" to track new allowances</p>
                                <p>3. Use "Overview" to monitor and manage allowances</p>
                                <p>4. Edit or revoke allowances you own</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16">
                        <div className="card lg:mx-auto lg:max-w-7xl">
                            <h2 className="text-2xl font-semibold text-black mb-4">
                                About the Project
                            </h2>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                This project was developed by Eva MIRZA as part of the Junior Fullstack Case Study internship. 
                                It demonstrates the implementation of a secure interface for managing ERC-20 token allowances 
                                on the Holesky network. Built with modern web technologies, it showcases both frontend and 
                                backend development skills while maintaining high security standards.
                            </p>
                            <div className="flex justify-center">
                                <img 
                                    src="/images/kiln-logo.png" 
                                    alt="Kiln Logo" 
                                    className="h-16"
                                />
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 text-center mt-6">
                            Running on Holesky Network • Built with Laravel, React, and TypeScript
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 