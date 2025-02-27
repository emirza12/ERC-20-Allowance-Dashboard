import { useState, PropsWithChildren } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
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
            <nav className="nav-container">
                <div className="content-container">
                    <div className="nav-content">
                        <div className="nav-logo-section">
                            <Link href={route('home')} className="flex items-center">
                                <ApplicationLogo className="w-32 h-32" />
                            </Link>

                            <div className="nav-links">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`nav-link ${route().current(item.routeName) ? 'active' : ''}`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="hidden md:flex items-center">
                            <WalletStatus />
                        </div>

                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((show) => !show)}
                                className="mobile-menu-button"
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

                <div className={`mobile-menu ${showingNavigationDropdown ? 'block' : 'hidden'}`}>
                    <div className="mobile-menu-links">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`mobile-menu-link ${route().current(item.routeName) ? 'active' : ''}`}
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

            {header && (
                <header className="bg-white shadow-sm">
                    <div className="content-container py-4">
                        {header}
                    </div>
                </header>
            )}

            <main className="content-container py-6">
                {children}
            </main>
        </div>
    );
}