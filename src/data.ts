import type { Expense } from './types/expense';

const categories = ["Food", "Travel", "Utilities", "Entertainment", "Health", "Other"];

function generateExpenses(count: number): Expense[] {
  const expenses: Expense[] = [];

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const amount = parseFloat((Math.random() * 200 + 5).toFixed(2)); // $5–$205
    expenses.push({ category, amount });
  }

  return expenses;
}

export const expenses = generateExpenses(40);