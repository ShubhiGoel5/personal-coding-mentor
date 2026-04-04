import React, { useState } from 'react';
import { Plus, Filter, Trash2 } from 'lucide-react';

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Starbucks', category: 'Food & Dining', amount: 5.50, date: '2024-04-10' },
    { id: 2, name: 'Spotify', category: 'Entertainment', amount: 12.99, date: '2024-04-09' },
    { id: 3, name: 'Grocery Store', category: 'Food & Dining', amount: 82.45, date: '2024-04-08' },
    { id: 4, name: 'Gas Station', category: 'Transportation', amount: 48.00, date: '2024-04-07' },
    { id: 5, name: 'Netflix', category: 'Entertainment', amount: 15.99, date: '2024-04-06' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Food & Dining',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [selectedFilter, setSelectedFilter] = useState('all');

  const categories = [
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Utilities',
    'Healthcare',
    'Shopping',
    'Other',
  ];

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (formData.name && formData.amount) {
      const newExpense = {
        id: Math.max(...expenses.map((e) => e.id), 0) + 1,
        ...formData,
        amount: parseFloat(formData.amount),
      };
      setExpenses([newExpense, ...expenses]);
      setFormData({
        name: '',
        category: 'Food & Dining',
        amount: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const filteredExpenses =
    selectedFilter === 'all'
      ? expenses
      : expenses.filter((e) => e.category === selectedFilter);

  const totalSpent = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Expense Tracker</h2>
        <p className="text-slate-600">Track and manage your spending</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Add Expense Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Add Expense</h3>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Groceries"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Add Expense
              </button>
            </form>
          </div>
        </div>

        {/* Stats and List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
            <p className="text-sm text-slate-600 mb-2">Total Spent</p>
            <h2 className="text-3xl font-semibold text-slate-900">
              ${totalSpent.toFixed(2)}
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              {filteredExpenses.length} {filteredExpenses.length === 1 ? 'transaction' : 'transactions'}
            </p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <Filter size={16} className="text-slate-600" />
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700">
                  Amount
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-900">{expense.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">{expense.date}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-semibold text-slate-900">
                        ${expense.amount.toFixed(2)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <p className="text-sm text-slate-500">No expenses found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
