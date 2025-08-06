import type { Expense } from '../types/expense';
import type { GroupedExpenses } from '../types/expense';
import { useMemo, useCallback } from 'react';


export const useExpenseGrouper = (expenses: Expense[]) => {
  const groupedExpenses: GroupedExpenses = useMemo(() => {
    return expenses.reduce<GroupedExpenses>((acc, expense) => {
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

  return {
    groupedExpenses,
    getTotalByCategory,
    getCategoryCount,
  }
};