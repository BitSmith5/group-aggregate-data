import { useExpenseGrouper } from '../hooks/useExpenseGrouper';
import type { Expense } from '../types/expense';
import { useState } from 'react';
import '../styles/ExpenseGrouper.css';

interface ExpenseGrouperProps {
  expenses: Expense[];
}

export function ExpenseGrouper({ expenses }: ExpenseGrouperProps) {
  const {
    groupedExpenses,
    getTotalByCategory,
    getCategoryCount,
    getTotalAmount,
    getTopCategories
  } = useExpenseGrouper(expenses);

  const [categoryFilter, setCategoryFilter] = useState<string>('');

  if(expenses.length === 0) {
    return (
      <div className="expense-grouper-container">
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <p>No expenses to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-grouper-container">
      <section className="expense-section">
        <h2>All Expenses</h2>
        <ul className="category-list">
          {expenses.map((expense, index) => (
            <li key={`${expense.category}-${expense.amount}-${index}`} className="category-item">
              <span className="category-name">{expense.category}</span>
              <span className="category-amount">${expense.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>
      
      <section className="expense-section">
        <h2>Expense Summary</h2>
        <div className="summary-container">
          <div>
            <h3>Grouped Expenses</h3>
            <ul className="category-list">
              {Object.entries(groupedExpenses).map(([category, total]) => (
                <li key={category} className="category-item">
                  <span className="category-name">{category}</span>
                  <span className="category-amount">${total.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3>Totals</h3>
            <p className="category-item">Total Categories: {getCategoryCount()}</p>
            <p className="category-item">Total Amount: ${getTotalAmount().toFixed(2)}</p>
          </div>

          <div>
            <h3>Category Totals</h3>
            <select 
              className="category-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {Object.keys(groupedExpenses).map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="category-item">
              <span className="category-name">Selected Category Total:</span>
              <span className="category-amount">
                ${getTotalByCategory(categoryFilter || 'Food').toFixed(2)}
              </span>
            </div>
          </div>
          
          <div>
            <h3>Top Categories</h3>
            <ul className="category-list">
              {getTopCategories(5).map(([category, amount]) => (
                <li key={category} className="category-item">
                  <span className="category-name">{category}</span>
                  <span className="category-amount">${amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}