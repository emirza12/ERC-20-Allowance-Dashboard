export interface Allowance {
    id: number;
    contract_address: string;
    owner_address: string;
    spender_address: string;
    allowance_amount: string;
    created_at: string;
    updated_at: string;
}

export interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}