export default function ApplicationLogo({ className }: { className?: string }) {
    return (
        <div className="app-logo">
            <img 
                src="/images/kiln-logo.png" 
                alt="Logo"
                className={`h-24 ${className}`}
            />
        </div>
    );
}