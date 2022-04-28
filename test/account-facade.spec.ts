import { setup } from '../src';
import { AccountLegalityVerified } from '../src/account/events/AccountLegalityVerified.event';

describe('AccountFacade', () => {
  it('should return account by address', async () => {
    const { accountFacade } = setup();

    const existingAccount1 = await accountFacade.findAccountByAddress('0001');
    const existingAccount2 = await accountFacade.findAccountByAddress('0002');
    const notExistingAccount = await accountFacade.findAccountByAddress('6666');

    expect(existingAccount1!.toAttrs()).toHaveProperty('id', 1);
    expect(existingAccount2!.toAttrs()).toHaveProperty('id', 2);
    expect(notExistingAccount).toBeNull();
  });

  it('should update account', async () => {
    const { accountFacade } = setup();
    
    const account = await accountFacade.findAccountByAddress('0001');
    account!.updateBalance(0);
    await accountFacade.updateAccount(account!);

    const updatedAccount = await accountFacade.findAccountByAddress('0001');
    expect(updatedAccount!.balance).toBe(0);
  });

  it('should emit verified legality event', async () => {
    const { accountFacade, eventBus } = setup();

    const legalAccount = await accountFacade.findAccountByAddress('0001');
    const illegalAccount = await accountFacade.findAccountByAddress('0003');

    const accountVerifiedCb = jest.fn();
    eventBus.addEventListener(AccountLegalityVerified, accountVerifiedCb);

    await accountFacade.verifyAccountLegality('legal', legalAccount!);
    await accountFacade.verifyAccountLegality('illegal', illegalAccount!);

    expect(accountVerifiedCb).toHaveBeenNthCalledWith(1, { actionId: 'legal', isLegalAccount: true });
    expect(accountVerifiedCb).toHaveBeenNthCalledWith(2, { actionId: 'illegal', isLegalAccount: false });
  });
});