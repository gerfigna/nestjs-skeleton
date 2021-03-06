import { AggregateRoot, IEvent } from '@nestjs/cqrs';

const INTERNAL_EVENTS = Symbol();
const IS_AUTO_COMMIT_ENABLED = Symbol();

export abstract class CustomAggregateRoot extends AggregateRoot {
  constructor() {
    super();
    this.init();
  }

  private init(): void {
    if (undefined == this[INTERNAL_EVENTS]) {
      this[INTERNAL_EVENTS] = [];
      this[IS_AUTO_COMMIT_ENABLED] = false;
    }
  }

  commit(): void {
    this.init();
    this[INTERNAL_EVENTS].forEach(event => this.publish(event));
    this[INTERNAL_EVENTS].length = 0;
  }

  uncommit(): void {
    this.init();
    this[INTERNAL_EVENTS].length = 0;
  }
  getUncommittedEvents(): Array<IEvent> {
    this.init();
    return this[INTERNAL_EVENTS];
  }

  loadFromHistory(history): void {
    history.forEach(event => this.apply(event, true));
  }

  apply(event: IEvent, isFromHistory?: boolean): void {
    this.init();

    if (!isFromHistory && !this.autoCommit) {
      this[INTERNAL_EVENTS].push(event);
    }
    this.autoCommit && this.publish(event);
    const handler = this.getEventHandler(event);
    handler && handler.call(this, event);
  }
}
