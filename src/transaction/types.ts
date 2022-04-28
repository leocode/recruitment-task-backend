import { Account } from '../Account';

export interface TransactionRequest {
  id: number;
  fromAddress: string;
  toAddress: string;
  value: number;
}

export interface Transaction {
  id: number;
  from: Account;
  to: Account;
  value: number;
}