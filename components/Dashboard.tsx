import React from 'react';
import { User, WalletState, Transaction } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet, Trophy, Gamepad2, History, PlusCircle, ArrowUpRight } from 'lucide-react';

interface DashboardProps {
  user: User;
  wallet: WalletState;
  transactions: Transaction[];
  onPlayClick: () => void;
  onWalletClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, wallet, transactions, onPlayClick, onWalletClick }) => {
  const chartData = transactions.map(t => ({
    name: t.date.slice(5), // simplified date
    amount: t.amount,
    type: t.type
  }));

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={user.avatar} alt="User" className="w-12 h-12 rounded-full border-2 border-indigo-500" />
          <div>
            <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
            <p className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded-full inline-block">Verified Player</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">ID: {user.id}</p>
        </div>
      </div>

      {/* Wallet Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div onClick={onWalletClick} className="col-span-2 bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-xl text-white shadow-lg relative overflow-hidden cursor-pointer active:scale-95 transition-transform">
          <div className="absolute top-0 right-0 p-2 opacity-20">
            <Wallet size={64} />
          </div>
          <p className="text-indigo-100 text-sm">Total Balance</p>
          <h1 className="text-3xl font-bold mt-1">₹ {wallet.mainBalance + wallet.winningCash + wallet.bonusCash}</h1>
          <div className="mt-4 flex space-x-4 text-xs font-medium">
             <span>Win: ₹{wallet.winningCash}</span>
             <span>Bonus: ₹{wallet.bonusCash}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={onPlayClick}
          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 p-4 rounded-xl shadow-md flex flex-col items-center justify-center space-y-2 transition-colors"
        >
          <Gamepad2 size={32} />
          <span className="font-bold">Play Now</span>
        </button>
        <button 
          onClick={onWalletClick}
          className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center space-y-2 transition-colors"
        >
          <PlusCircle size={32} className="text-green-500" />
          <span className="font-bold">Add Cash</span>
        </button>
      </div>

      {/* Stats */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-700 flex items-center gap-2">
            <History size={18} /> Activity
          </h3>
          <span className="text-xs text-indigo-600 font-medium">Last 7 days</span>
        </div>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-4 text-white flex items-center justify-between shadow-md">
         <div>
           <p className="font-bold text-lg">50% Bonus!</p>
           <p className="text-xs text-pink-100">On your first deposit above ₹500</p>
         </div>
         <div className="bg-white/20 p-2 rounded-lg">
           <ArrowUpRight className="text-white" />
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
