import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function BudgetPlanner() {
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Food & Dining', limit: 500, spent: 320 },
    { id: 2, category: 'Transportation', limit: 200, spent: 185 },
    { id: 3, category: 'Entertainment', limit: 150, spent: 42 },
    { id: 4, category: 'Utilities', limit: 300, spent: 280 },
  ]);

  const [formData, setFormData] = useState({
    category: 'Food & Dining',
    limit: '',
  });

  const categories = [
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Utilities',
    'Healthcare',
    'Shopping',
    'Other',
  ];

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (formData.category && formData.limit) {
      const newBudget = {
        id: Math.max(...budgets.map((b) => b.id), 0) + 1,
        category: formData.category,
        limit: parseFloat(formData.limit),
        spent: 0,
      };
      setBudgets([...budgets, newBudget]);
      setFormData({
        category: 'Food & Dining',
        limit: '',
      });
    }
  };

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter((b) => b.id !== id));
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalBudget - totalSpent;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Budget Planner</h2>
        <p className="text-slate-600">Plan and track your monthly budgets</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <p className="text-sm text-slate-600 font-medium mb-2">Total Budget</p>
          <h3 className="text-3xl font-semibold text-slate-900">
            ${totalBudget.toFixed(2)}
          </h3>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <p className="text-sm text-slate-600 font-medium mb-2">Total Spent</p>
          <h3 className="text-3xl font-semibold text-red-600">
            ${totalSpent.toFixed(2)}
          </h3>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <p className="text-sm text-slate-600 font-medium mb-2">Remaining</p>
          <h3 className="text-3xl font-semibold text-green-600">
            ${totalRemaining.toFixed(2)}
          </h3>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Budget Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-md h-fit">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Create Budget</h3>
            <form onSubmit={handleAddBudget} className="space-y-4">
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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Monthly Limit
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.limit}
                  onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Create Budget
              </button>
            </form>
          </div>
        </div>

        {/* Budgets List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {budgets.length > 0 ? (
              budgets.map((budget) => {
                const percentage = (budget.spent / budget.limit) * 100;
                const isOverBudget = budget.spent > budget.limit;
                const statusColor = isOverBudget
                  ? 'bg-red-100'
                  : percentage > 75
                  ? 'bg-orange-100'
                  : 'bg-green-100';
                const progressColor = isOverBudget
                  ? 'bg-red-500'
                  : percentage > 75
                  ? 'bg-orange-500'
                  : 'bg-green-500';

                return (
                  <div
                    key={budget.id}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900">
                          {budget.category}
                        </h4>
                        <p className="text-sm text-slate-600 mt-1">
                          ${budget.spent.toFixed(2)} of ${budget.limit.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteBudget(budget.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                          {isOverBudget ? 'Over Budget' : `${percentage.toFixed(0)}% Used`}
                        </span>
                        <span className="text-xs font-medium text-slate-600">
                          ${(budget.limit - budget.spent).toFixed(2)} left
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${progressColor}`}
                          style={{
                            width: `${Math.min(percentage, 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Status Message */}
                    {isOverBudget && (
                      <p className="text-xs text-red-600 font-medium">
                        ⚠️ You've exceeded this budget by ${(budget.spent - budget.limit).toFixed(2)}
                      </p>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-2xl p-12 shadow-md text-center">
                <p className="text-slate-500">No budgets created yet. Start by creating one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
