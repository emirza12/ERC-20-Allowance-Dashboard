import { useState, PropsWithChildren } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import WalletStatus from '@/Components/WalletStatus';

export default function MainLayout({ header, children }: PropsWithChildren<{ header?: JSX.Element }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const navigation = [
        { name: 'Overview', href: route('overview'), routeName: 'overview' },
        { name: 'Add Allowance', href: route('allowances.add'), routeName: 'allowances.add' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        {/* Logo et Navigation */}
                        <div className="flex items-center">
                            <Link href={route('home')} className="flex items-center">
                                <ApplicationLogo className="w-32 h-32" />
                            </Link>

                            {/* Navigation Links */}
                            <div className="hidden md:flex md:ml-10 space-x-8">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`inline-flex items-center px-4 py-2 text-base font-semibold transition-colors duration-200
                                            ${route().current(item.routeName)
                                                ? 'text-orange-500'
                                                : 'text-black hover:text-orange-500'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Wallet Status */}
                        <div className="hidden md:flex items-center">
                            <WalletStatus />
                        </div>

                        {/* Menu Mobile */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((show) => !show)}
                                className="p-2 rounded-md text-gray-400 hover:bg-gray-100"
                            >
                                <span className="sr-only">Open menu</span>
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu Mobile Déroulant */}
                <div className={`md:hidden ${showingNavigationDropdown ? 'block' : 'hidden'}`}>
                    <div className="pt-2 pb-3 space-y-1 px-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`block px-3 py-2 rounded-md text-base font-medium
                                    ${route().current(item.routeName)
                                        ? 'text-indigo-600 bg-indigo-50'
                                        : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="px-4">
                            <WalletStatus />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header */}
            {header && (
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Contenu */}
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}