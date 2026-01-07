import React, { useState } from 'react';
import { ViewState, User, WalletState, GameConfig } from './types';
import { MOCK_TRANSACTIONS, AVATARS } from './constants';
import Dashboard from './components/Dashboard';
import GameLobby from './components/GameLobby';
import ActiveGame from './components/ActiveGame';

// Layout Wrapper
const MobileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex justify-center bg-gray-200">
    <div className="w-full max-w-md bg-white shadow-2xl overflow-hidden min-h-screen relative flex flex-col">
      {children}
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('LOGIN');
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<WalletState>({
    mainBalance: 450,
    winningCash: 120,
    bonusCash: 50
  });
  const [activeGameConfig, setActiveGameConfig] = useState<GameConfig | null>(null);

  // Login Form Logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const mobile = formData.get('mobile') as string;
    
    if (name && mobile) {
      setUser({
        id: `UID${Math.floor(Math.random() * 10000)}`,
        name,
        mobile,
        isVerified: true,
        avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)]
      });
      setView('DASHBOARD');
    }
  };

  const startGame = (config: GameConfig) => {
    setActiveGameConfig(config);
    // Deduct Balance Mock
    setWallet(prev => ({
      ...prev,
      mainBalance: prev.mainBalance - config.entryFee
    }));
    setView('GAME');
  };

  const leaveGame = () => {
    setView('DASHBOARD');
    setActiveGameConfig(null);
  };

  return (
    <MobileLayout>
      {view === 'LOGIN' && (
        <div className="flex-1 flex flex-col justify-center p-8 bg-slate-900 text-white">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">LUDO PRO</h1>
            <p className="text-slate-400">Real Money, Real Fun.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Full Name</label>
              <input name="name" type="text" required placeholder="e.g. Rahul Sharma" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Mobile Number</label>
              <input name="mobile" type="tel" required placeholder="+91 98765 43210" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" required id="age" className="w-4 h-4 rounded accent-indigo-500" />
              <label htmlFor="age" className="text-sm text-slate-400">I am 18+ years of age.</label>
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95">
              GET OTP & LOGIN
            </button>
          </form>
        </div>
      )}

      {view === 'DASHBOARD' && user && (
        <div className="p-4 bg-gray-50 flex-1 overflow-y-auto">
          <Dashboard 
            user={user} 
            wallet={wallet} 
            transactions={MOCK_TRANSACTIONS} 
            onPlayClick={() => setView('LOBBY')}
            onWalletClick={() => alert("Wallet Modal: Connect Payment Gateway here.")}
          />
        </div>
      )}

      {view === 'LOBBY' && (
        <GameLobby 
          onBack={() => setView('DASHBOARD')} 
          onJoinGame={startGame} 
          balance={wallet.mainBalance + wallet.winningCash} 
        />
      )}

      {view === 'GAME' && activeGameConfig && (
        <ActiveGame config={activeGameConfig} onLeave={leaveGame} />
      )}
    </MobileLayout>
  );
};

export default App;
