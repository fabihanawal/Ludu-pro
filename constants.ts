import { Transaction } from "./types";

export const APP_NAME = "Ludo Pro";
export const PLATFORM_COMMISSION_PERCENT = 10;

export const AVATARS = [
  "https://picsum.photos/seed/u1/100/100",
  "https://picsum.photos/seed/u2/100/100",
  "https://picsum.photos/seed/u3/100/100",
  "https://picsum.photos/seed/u4/100/100",
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "tx1", type: "DEPOSIT", amount: 500, status: "SUCCESS", date: "2023-10-25" },
  { id: "tx2", type: "ENTRY_FEE", amount: 50, status: "SUCCESS", date: "2023-10-26" },
  { id: "tx3", type: "WINNING", amount: 90, status: "SUCCESS", date: "2023-10-26" },
  { id: "tx4", type: "WITHDRAWAL", amount: 200, status: "PENDING", date: "2023-10-27" },
];

export const ENTRY_FEES = [10, 25, 50, 100, 500, 1000];
