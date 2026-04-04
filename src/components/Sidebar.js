import React from 'react';
import { Home, MessageCircle, TrendingUp, Target, X } from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'chat', label: 'Finance Mentor', icon: MessageCircle },
    { id: 'expenses', label: 'Expenses', icon: TrendingUp },
    { id: 'budget', label: 'Budget', icon: Target },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white shadow-lg z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-indigo-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">
                💰
              </div>
              <h1 className="text-xl font-semibold">Finance</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden hover:bg-indigo-600 p-1 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <nav className="mt-8 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                  isActive
                    ? 'bg-white/20 shadow-md'
                    : 'hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-indigo-500">
          <div className="text-sm text-indigo-100">
            <p className="font-medium">Premium Account</p>
            <p className="text-xs mt-1 opacity-75">user@example.com</p>
          </div>
        </div>
      </aside>
    </>
  );
}
