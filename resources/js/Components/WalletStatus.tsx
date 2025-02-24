import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function WalletStatus() {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();

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

    if (!isConnected) {
        return (
            <button
                onClick={() => connect({ connector: injected() })}
                className="login-button"
            >
                Connect Wallet
            </button>
        );
    }

    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center bg-black/5 px-6 py-3 rounded-full">
                <div className="flex items-center">
                    <div className="w-2.5 h-2.5 bg-orange-500 rounded-full mr-3" />
                    <button 
                        onClick={(e) => copyToClipboard(e, address || '')}
                        className="text-black font-medium hover:text-orange-500 transition-colors"
                        title="Click to copy address"
                    >
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                    </button>
                </div>
            </div>
            
            <button
                onClick={() => disconnect()}
                className="login-button inverted"
            >
                <svg 
                    className="w-4 h-4 mr-2 inline" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                    />
                </svg>
                Disconnect
            </button>
        </div>
    );
}