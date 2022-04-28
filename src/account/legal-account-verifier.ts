import { Account } from '../Account';
import { EventBus } from '../event-bus';
import { AccountLegalityVerified } from './events/AccountLegalityVerified.event';

export class AccountLegalityVerifier {
  constructor(private eventBus: EventBus) {}

  public async verify(actionId: any, account: Account): Promise<void> {
    const accountAttrs = account.toAttrs();

    const isLegalAccount = !this.getListOfIllegalAccounts().includes(accountAttrs.id);

    // This information is normally received by pushing request to a queue
    // and response is retrieved in another place.
    // For now, it just emits an event to a simple event bus.
    // Event contains `actionId` which allows to identify verification action
    this.eventBus.publish(new AccountLegalityVerified(actionId, isLegalAccount));
  }

  private getListOfIllegalAccounts(): number[] {
    return [3];
  }
}