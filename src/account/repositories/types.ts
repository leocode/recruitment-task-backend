import { Account } from '../../Account';

export abstract class AccountRepository {
  abstract findByAddress(address: string): Promise<Account | null>;
  abstract save(account: Account): Promise<void>;
}