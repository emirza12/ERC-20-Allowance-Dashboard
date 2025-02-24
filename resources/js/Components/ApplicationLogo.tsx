interface Props {
    className?: string;
}

export default function ApplicationLogo({ className }: Props) {
    return (
        <div className="flex items-center justify-center">
            <img 
                src="/images/kiln-logo.png" 
                alt="Logo"
                className={`w-auto h-12 ${className}`}
                style={{ 
                    objectFit: 'contain',
                    maxWidth: 'none'
                }}
            />
        </div>
    );
}