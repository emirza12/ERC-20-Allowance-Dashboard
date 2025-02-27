import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

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
        <div className="wallet-container">
            <div className="wallet-address">
                <div className="flex items-center">
                    <div className="wallet-status-dot" />
                    <button 
                        onClick={(e) => copyToClipboard(e, address || '')}
                        className="wallet-address-text"
                        title="Click to copy address"
                    >
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                    </button>
                </div>
            </div>
            
            <button onClick={() => disconnect()} className="login-button inverted">
                <svg className="disconnect-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                    />
                </svg>
                Disconnect
            </button>
        </div>
    );
}