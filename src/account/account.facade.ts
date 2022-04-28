import { Account } from '../Account';
import { AccountLegalityVerifier } from './legal-account-verifier';
import { AccountInMemoryRepository } from './repositories/account-inmemory.repository';

export class AccountFacade {
  constructor(
    private accountRepository: AccountInMemoryRepository,
    private accountLegalityVerifier: AccountLegalityVerifier
  ) {}

  public async findAccountByAddress(address: string): Promise<Account | null> {
    return await this.accountRepository.findByAddress(address);
  }

  public async updateAccount(account: Account): Promise<void> {
    return await this.accountRepository.save(account);
  }

  public async verifyAccountLegality(actionId: any, account: Account): Promise<void> {
    return await this.accountLegalityVerifier.verify(actionId, account);
  }
}