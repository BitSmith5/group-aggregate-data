import type { Expense } from '../types/expense';
import type { GroupedExpenses } from '../types/expense';
import { useMemo, useCallback } from 'react';


export const useExpenseGrouper = (expenses: Expense[]) => {
  const groupedExpenses: GroupedExpenses = useMemo(() => {
    return expenses.reduce<GroupedExpenses>((acc, expense) => {
      if(!expense.category || typeof expense.amount !== 'number') {
        return acc; // Skip invalid entries
      }
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {});
  }, [expenses]);

  const getTotalByCategory = useCallback((category: string): number => {
    return groupedExpenses[category] || 0;
  }, [groupedExpenses]);

  const getCategoryCount = useCallback((): number => {
    return Object.keys(groupedExpenses).length;
  }, [groupedExpenses]);

  const getTotalAmount = useCallback((): number => {
    return Object.values(groupedExpenses).reduce((total, amount) => total + amount, 0);
  }, [groupedExpenses]);

  const getTopCategories = useCallback((limit: number): string[] => {
    return Object.entries(groupedExpenses).sort(([, a], [, b]) => b - a).slice(0, limit).map(([category]) => category);
  }, [groupedExpenses]);

  return {
    groupedExpenses,
    getTotalByCategory,
    getCategoryCount,
    getTotalAmount,
    getTopCategories
  }
};