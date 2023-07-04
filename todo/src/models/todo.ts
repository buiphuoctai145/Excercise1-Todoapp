export interface Todo{
    id: string;
    name: string;
    description: string;
    category: string;
    isCompleted: boolean;
    isFlagged?: boolean;
}