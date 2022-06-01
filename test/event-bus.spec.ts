import { EventBus } from '../src/event-bus';

describe('EventBus', () => {
  it('should add listener', () => {
    const eventBus = new EventBus();
    const cb = jest.fn();
    const event = new SomeEvent();

    eventBus.addEventListener(SomeEvent, cb);
    eventBus.publish(event);

    expect(cb).toBeCalledWith(event);
  });

  it('should remove listener', () => {
    const eventBus = new EventBus();
    const cb = jest.fn();
    const event = new SomeEvent();

    eventBus.addEventListener(SomeEvent, cb);
    eventBus.removeEventListener(SomeEvent, cb);
    eventBus.publish(event);

    expect(cb).not.toBeCalledWith(event);
  });
});

class SomeEvent {}

