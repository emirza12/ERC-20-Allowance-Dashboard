import { useWriteContract, useReadContract } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';

const ERC20_ABI = [
    {
        constant: false,
        inputs: [
            { name: '_spender', type: 'address' },
            { name: '_value', type: 'uint256' }
        ],
        name: 'approve',
        outputs: [{ name: '', type: 'bool' }],
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            { name: '_owner', type: 'address' },
            { name: '_spender', type: 'address' }
        ],
        name: 'allowance',
        outputs: [{ name: '', type: 'uint256' }],
        type: 'function'
    }
];

export function useERC20() {
    const { writeContractAsync } = useWriteContract();

    const approve = async (contractAddress: string, spender: string, amount: string) => {
        try {
            const tx = await writeContractAsync({
                address: contractAddress as `0x${string}`,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [spender as `0x${string}`, parseUnits(amount, 18)]
            });
            return tx;
        } catch (error) {
            throw error;
        }
    };

    const getAllowance = async (contractAddress: string, owner: string, spender: string) => {
        try {
            const result = await useReadContract({
                address: contractAddress as `0x${string}`,
                abi: ERC20_ABI,
                functionName: 'allowance',
                args: [owner as `0x${string}`, spender as `0x${string}`]
            }).data;
            return formatUnits(result as bigint, 18);
        } catch (error) {
            throw error;
        }
    };

    const revoke = async (contractAddress: string, spender: string) => {
        return approve(contractAddress, spender, '0');
    };

    return { approve, getAllowance, revoke };
}