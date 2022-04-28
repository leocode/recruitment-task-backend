import { TransactionManager } from './transaction-manager';
import { Transaction, TransactionRequest } from './types';

export class TransactionFacade {
  constructor(
    private manager: TransactionManager,
  ) {}

  public async processTransactionRequest(transaction: TransactionRequest): Promise<void> {
    await this.manager.processTransactionRequest(transaction)
  }
}