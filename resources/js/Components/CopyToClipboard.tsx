const copyToClipboard = async (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
        } else {
            // Simple fallback
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
        }

        const button = e.currentTarget as HTMLButtonElement;
        button.textContent = 'Copied!';
        setTimeout(() => {
            const truncatedText = `${text.slice(0, 6)}...${text.slice(-4)}`;
            button.textContent = truncatedText;
        }, 1000);
    } catch (error) {
        console.error('Copy failed:', error);
    }
};

export default copyToClipboard;