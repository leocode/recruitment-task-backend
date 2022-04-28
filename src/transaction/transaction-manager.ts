import { AccountFacade } from '../account/account.facade';
import { TransactionExecutor } from './transaction-executor';
import { TransactionRequest } from './types';

export class TransactionManager {
  constructor(
    private accountFacade: AccountFacade,
    private transactionExecutor: TransactionExecutor,
  ) {}

  public async processTransactionRequest(transaction: TransactionRequest): Promise<void> {
    const accountFrom = await this.accountFacade.findAccountByAddress(transaction.fromAddress);
    const accountTo = await this.accountFacade.findAccountByAddress(transaction.toAddress);

    if (!accountFrom || !accountTo) {
      throw new Error(`Cannot execute transaction ${transaction.id}. Account from (${transaction.fromAddress}) or to (${transaction.toAddress}) not found.`);
    }

    await this.transactionExecutor.execute({
      from: accountFrom,
      to: accountTo,
      id: transaction.id,
      value: transaction.value,
    });
  }
}