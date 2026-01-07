import React, { useState } from 'react';
import { GameMode, GameConfig } from '../types';
import { ENTRY_FEES, PLATFORM_COMMISSION_PERCENT } from '../constants';
import { Users, Clock, Zap, Info } from 'lucide-react';

interface GameLobbyProps {
  onJoinGame: (config: GameConfig) => void;
  onBack: () => void;
  balance: number;
}

const GameLobby: React.FC<GameLobbyProps> = ({ onJoinGame, onBack, balance }) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>(GameMode.CLASSIC);
  const [selectedFee, setSelectedFee] = useState<number>(ENTRY_FEES[0]);
  const [playerCount, setPlayerCount] = useState<2 | 4>(2);

  const calculatePrize = (fee: number, players: number) => {
    const totalPool = fee * players;
    const commission = (totalPool * PLATFORM_COMMISSION_PERCENT) / 100;
    return totalPool - commission;
  };

  const handleJoin = () => {
    if (balance < selectedFee) {
      alert("Insufficient Balance! Please recharge.");
      return;
    }
    onJoinGame({
      mode: selectedMode,
      players: playerCount,
      entryFee: selectedFee,
      prizePool: calculatePrize(selectedFee, playerCount)
    });
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="text-gray-500 text-sm mb-2">← Back to Dashboard</button>
        <h1 className="text-2xl font-bold text-slate-800">Select Game</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Game Modes */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Game Mode</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: GameMode.CLASSIC, icon: Users, label: 'Classic' },
              { id: GameMode.QUICK, icon: Zap, label: 'Quick' },
              { id: GameMode.TIMER, icon: Clock, label: 'Timer' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                  selectedMode === mode.id
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-white bg-white text-gray-500 shadow-sm'
                }`}
              >
                <mode.icon size={24} className="mb-2" />
                <span className="text-sm font-medium">{mode.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Players */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Players</label>
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            {[2, 4].map((count) => (
              <button
                key={count}
                onClick={() => setPlayerCount(count as 2 | 4)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                  playerCount === count
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {count} Players
              </button>
            ))}
          </div>
        </div>

        {/* Entry Fee */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Entry Fee (₹)</label>
          <div className="grid grid-cols-3 gap-3">
            {ENTRY_FEES.map((fee) => (
              <button
                key={fee}
                onClick={() => setSelectedFee(fee)}
                className={`py-3 rounded-xl border-2 text-lg font-bold transition-all ${
                  selectedFee === fee
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-transparent bg-white text-gray-700 shadow-sm'
                }`}
              >
                ₹{fee}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-slate-800 text-white p-5 rounded-2xl shadow-lg mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-400 text-sm">Prize Pool</span>
            <span className="text-2xl font-bold text-yellow-400">₹{calculatePrize(selectedFee, playerCount)}</span>
          </div>
          <div className="flex justify-between items-center text-sm border-t border-slate-700 pt-3 mt-1">
            <span className="text-slate-400">Entry Fee</span>
            <span>₹{selectedFee}</span>
          </div>
          <div className="flex justify-between items-center text-xs mt-1 text-slate-500">
            <span className="flex items-center gap-1"><Info size={10} /> Platform Fee {PLATFORM_COMMISSION_PERCENT}% applied</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <button
          onClick={handleJoin}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 active:scale-95 transition-all"
        >
          START GAME
        </button>
      </div>
    </div>
  );
};

export default GameLobby;
