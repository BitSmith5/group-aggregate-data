export interface Expense {
    category: string;
    amount: number;
}

export type GroupedExpenses = Record<string, number>;