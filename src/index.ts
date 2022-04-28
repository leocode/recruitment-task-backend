import { AccountFacade } from './account/account.facade';
import { AccountLegalityVerifier } from './account/legal-account-verifier';
import { AccountInMemoryRepository } from './account/repositories/account-inmemory.repository';
import { EventBus } from './event-bus';
import { TransactionExecutor } from './transaction/transaction-executor';
import { TransactionManager } from './transaction/transaction-manager';

export const setup = () => {
  const eventBus = new EventBus();
  const accountRepository = new AccountInMemoryRepository();
  const accountLegalityVerifier = new AccountLegalityVerifier(eventBus);
  const accountFacade = new AccountFacade(accountRepository, accountLegalityVerifier);

  const transactionExecutor = new TransactionExecutor(accountFacade);
  const transactionFacade = new TransactionManager(accountFacade, transactionExecutor);

  return {
    accountFacade,
    transactionFacade,
    eventBus,
  }
};
