export type ViewState = 'LOGIN' | 'DASHBOARD' | 'LOBBY' | 'GAME' | 'WALLET' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  mobile: string;
  isVerified: boolean;
  avatar: string;
}

export interface WalletState {
  mainBalance: number;
  winningCash: number;
  bonusCash: number;
}

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'ENTRY_FEE' | 'WINNING';
  amount: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  date: string;
}

export enum GameMode {
  CLASSIC = 'Classic',
  QUICK = 'Quick',
  TIMER = 'Timer',
}

export interface GameConfig {
  mode: GameMode;
  players: 2 | 4;
  entryFee: number;
  prizePool: number;
}

export type PlayerColor = 'red' | 'green' | 'yellow' | 'blue';

export interface Token {
  id: string;
  position: number; // 0-51 path index, or special zones
  status: 'HOME' | 'PATH' | 'WIN' | 'BASE';
}

export interface GamePlayer {
  id: string;
  name: string;
  color: PlayerColor;
  tokens: Token[];
  isTurn: boolean;
}
