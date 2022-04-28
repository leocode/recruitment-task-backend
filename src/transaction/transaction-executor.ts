import { AccountFacade } from '../account/account.facade';
import { Transaction } from './types';

export class TransactionExecutor {
  constructor(
    private accountFacade: AccountFacade,
  ) {}

  public async execute(transaction: Transaction): Promise<void> {
    const fromAccount = transaction.from;
    const toAccount = transaction.to;

    fromAccount.updateBalance(fromAccount.balance - transaction.value);
    toAccount.updateBalance(toAccount.balance + transaction.value);

    await this.accountFacade.updateAccount(fromAccount);
    await this.accountFacade.updateAccount(toAccount);
  }
}