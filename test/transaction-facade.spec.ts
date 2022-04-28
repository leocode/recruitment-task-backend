import { setup } from '../src';
import { TransactionRequest } from '../src/transaction/types';

describe('TransactionFacade', () => {
  it('should process transaction request', async () => {
    const { transactionFacade, accountFacade } = setup();

    const transaction: TransactionRequest = {
      fromAddress: '0001',
      toAddress: '0002',
      id: 1,
      value: 500,
    };

    await transactionFacade.processTransactionRequest(transaction);

    const accountFrom = await accountFacade.findAccountByAddress(transaction.fromAddress);
    const accountTo = await accountFacade.findAccountByAddress(transaction.toAddress);

    expect(accountFrom!.toAttrs()).toHaveProperty('balance', 1000 - transaction.value);
    expect(accountTo!.toAttrs()).toHaveProperty('balance', 1000 + transaction.value);
  });

  it('should fail transaction request on unknown accounts', async () => {
    const { transactionFacade, accountFacade } = setup();

    await expect(transactionFacade.processTransactionRequest({
      fromAddress: '6666',
      toAddress: '0002',
      id: 1,
      value: 500,
    })).rejects.toThrow();

    await expect(transactionFacade.processTransactionRequest({
      fromAddress: '0001',
      toAddress: '6666',
      id: 1,
      value: 500,
    })).rejects.toThrow();
  });
});
