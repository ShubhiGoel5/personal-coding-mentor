import React from 'react';
import { DollarSign, TrendingUp, PiggyBank, Eye, EyeOff } from 'lucide-react';

export default function Dashboard() {
  const [showBalance, setShowBalance] = React.useState(true);

  const stats = [
    {
      label: 'Total Balance',
      value: '$12,450.50',
      icon: DollarSign,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      trend: '+2.5%',
    },
    {
      label: 'Monthly Spending',
      value: '$3,240.00',
      icon: TrendingUp,
      color: 'bg-orange-50',
      iconColor: 'text-orange-600',
      trend: '+12%',
    },
    {
      label: 'Savings',
      value: '$5,680.00',
      icon: PiggyBank,
      color: 'bg-green-50',
      iconColor: 'text-green-600',
      trend: '+8.3%',
    },
  ];

  const recentTransactions = [
    { id: 1, name: 'Starbucks', category: 'Food', amount: '-$5.50', date: 'Today' },
    { id: 2, name: 'Spotify', category: 'Subscription', amount: '-$12.99', date: 'Today' },
    { id: 3, name: 'Grocery Store', category: 'Food', amount: '-$82.45', date: 'Yesterday' },
    { id: 4, name: 'Gas Station', category: 'Transport', amount: '-$48.00', date: 'Yesterday' },
    { id: 5, name: 'Salary Deposit', category: 'Income', amount: '+$3,500.00', date: '2 days ago' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Welcome back, Sarah</h2>
        <p className="text-slate-600">Here's your financial overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className={`${stat.iconColor} w-6 h-6`} />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  {stat.trend}
                </span>
              </div>
              <p className="text-slate-600 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-semibold text-slate-900">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Recent Transactions</h3>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{transaction.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{transaction.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${
                      transaction.amount.startsWith('+')
                        ? 'text-green-600'
                        : 'text-slate-900'
                    }`}>
                      {transaction.amount}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Account Status */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Account Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-600">Account Health</span>
                <span className="text-sm font-semibold text-green-600">Excellent</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full w-full" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-600">Savings Rate</span>
                <span className="text-sm font-semibold text-slate-900">42%</span>
              </div>
            </div>
          </div>

          {/* Balance Visibility */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900">Available Balance</h3>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {showBalance ? (
                  <Eye className="w-4 h-4 text-slate-600" />
                ) : (
                  <EyeOff className="w-4 h-4 text-slate-600" />
                )}
              </button>
            </div>
            <p className="text-2xl font-semibold text-slate-900">
              {showBalance ? '$8,210.50' : '••••••'}
            </p>
            <p className="text-xs text-slate-500 mt-2">Ready to spend</p>
          </div>
        </div>
      </div>
    </div>
  );
}
