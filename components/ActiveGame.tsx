import React, { useState, useEffect, useRef } from 'react';
import { GameConfig } from '../types';
import LudoBoard from './LudoBoard';
import { MessageSquare, Mic, Volume2 } from 'lucide-react';
import { getLudoStrategyTip } from '../services/geminiService';

interface ActiveGameProps {
  config: GameConfig;
  onLeave: () => void;
}

const ActiveGame: React.FC<ActiveGameProps> = ({ config, onLeave }) => {
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [turn, setTurn] = useState<'me' | 'opponent'>('me');
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  
  // Audio Mock
  const rollSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Simulate game start
    setMessages([{ sender: 'System', text: 'Game Started! Good Luck.' }]);
    
    // Auto opponent move if not my turn
    if (turn === 'opponent') {
      setTimeout(() => {
        handleOpponentMove();
      }, 2000);
    }
  }, [turn]);

  const handleRollDice = () => {
    if (turn !== 'me' || isRolling) return;

    setIsRolling(true);
    // Simulate roll animation time
    setTimeout(() => {
      const val = Math.floor(Math.random() * 6) + 1;
      setDiceValue(val);
      setIsRolling(false);
      
      // Pass turn logic mock
      if (val !== 6) {
        setTimeout(() => setTurn('opponent'), 1000);
      } else {
        // Roll again logic would go here
      }
    }, 600);
  };

  const handleOpponentMove = () => {
    setIsRolling(true);
    setTimeout(() => {
      const val = Math.floor(Math.random() * 6) + 1;
      setDiceValue(val);
      setIsRolling(false);
      if (val !== 6) {
        setTimeout(() => setTurn('me'), 1000);
      } else {
         setTimeout(() => handleOpponentMove(), 1500); // Opponent rolls again
      }
    }, 1000);
  };

  const askAiAssistant = async () => {
    setIsAiThinking(true);
    const tip = await getLudoStrategyTip('Player', `Current dice roll: ${diceValue || 'waiting'}, Game Mode: ${config.mode}`);
    setMessages(prev => [...prev, { sender: 'AI Coach', text: tip }]);
    setIsAiThinking(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-800 text-white relative">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-3 bg-slate-900 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white"></div>
          <div>
            <p className="text-xs text-slate-400">Opponent</p>
            <p className="font-bold text-sm">Player 2</p>
          </div>
        </div>
        <div className="text-yellow-400 font-mono text-xl">₹{config.prizePool}</div>
        <button onClick={onLeave} className="text-xs text-red-400 border border-red-900 px-2 py-1 rounded">
          Leave
        </button>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-2 relative">
        <LudoBoard players={[{color: 'red', active: true}, {color: 'yellow', active: true}]} />
        
        {/* Dice & Controls Overlay */}
        <div className="absolute bottom-4 right-4 flex flex-col items-center gap-2">
           {/* Self Profile */}
           <div className="flex items-center gap-2 mb-4 bg-slate-900/80 p-2 rounded-lg backdrop-blur-sm">
             <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white"></div>
             <div className="text-right">
               <p className="font-bold text-sm">You</p>
               <p className="text-xs text-green-400">Online</p>
             </div>
           </div>

           {/* Dice Button */}
           <button 
             disabled={turn !== 'me' || isRolling}
             onClick={handleRollDice}
             className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl transition-all ${
               turn === 'me' 
                 ? 'bg-white text-indigo-900 animate-pulse ring-4 ring-indigo-500/50' 
                 : 'bg-slate-600 text-slate-400 opacity-50'
             }`}
           >
             {isRolling ? (
               <span className="animate-spin text-2xl">🎲</span>
             ) : (
               <span className="text-4xl font-bold">{diceValue || '?'}</span>
             )}
           </button>
           <p className="text-xs font-semibold mt-1">
             {turn === 'me' ? 'YOUR TURN' : 'OPPONENT TURN'}
           </p>
        </div>
      </div>

      {/* Chat / AI Bar */}
      <div className="h-48 bg-slate-900 border-t border-slate-700 flex flex-col">
         <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`text-xs p-2 rounded max-w-[80%] ${m.sender === 'AI Coach' ? 'bg-indigo-900/50 text-indigo-200 border border-indigo-500/30' : 'bg-slate-800 text-slate-300'}`}>
                <span className="font-bold block opacity-70 mb-0.5">{m.sender}</span>
                {m.text}
              </div>
            ))}
            {isAiThinking && <div className="text-xs text-indigo-400 animate-pulse">AI is thinking...</div>}
         </div>
         
         <div className="p-2 bg-slate-950 flex gap-2">
            <button 
              onClick={askAiAssistant}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
            >
              <MessageSquare size={14} /> Ask AI Coach
            </button>
            <button className="w-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
               <Mic size={16} />
            </button>
            <button className="w-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
               <Volume2 size={16} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default ActiveGame;
