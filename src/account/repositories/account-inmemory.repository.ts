import { Account, AccountAttrs } from '../../Account';
import { AccountRepository } from './types';

export class AccountInMemoryRepository extends AccountRepository {
  private accounts: AccountAttrs[] = [
    { id: 1, address: '0001', balance: 1000 },
    { id: 2, address: '0002', balance: 1000 },
    { id: 3, address: '0003', balance: 1000 },
    { id: 4, address: '0004', balance: 1000 },
  ];

  public async findByAddress(address: string): Promise<Account | null> {
    const account = this.accounts.find(a => a.address === address);

    return account ? this.mapToEntity(account) : null;
  }

  public async save(account: Account): Promise<void> {
    const attrs = account.toAttrs();
    const accountIndex = this.accounts.findIndex(a => a.id === attrs.id);

    if (accountIndex < 0) {
      throw new Error(`Unknown account id: ${attrs.id}`);
    }

    this.accounts.splice(accountIndex, 1, attrs);
  }

  private mapToEntity(account: AccountAttrs): Account {
    return Account.fromAttrs(account);
  }
}