import { AggregateRoot, CommandBus, EventPublisher, ICommand } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { CustomAggregateRoot } from '@domain/common/model/custom.aggregate.root';
import { CommandBusInterface } from '@domain/common/interface/command.bus.interface';

@Injectable()
export class TransactionalBus implements CommandBusInterface {
  logger: Logger;
  constructor(
    private readonly orm: MikroORM,
    private readonly commandBus: CommandBus,
    private readonly eventPublisher: EventPublisher
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute<T extends ICommand>(command: T): Promise<any> {
    const entities = [];
    return await this.orm.em
      .transactional(async (_em: EntityManager) => {
        try {
          this.logger.debug(`Executing command ${command.constructor.name}`);

          const result = await this.commandBus.execute(command);

          _em
            .getUnitOfWork()
            .getIdentityMap()
            .values()
            .forEach(entity => {
              if (entity instanceof CustomAggregateRoot) {
                entities.push(entity);
              }
            });

          return result;
        } catch (e) {
          this.logger.error(e);

          throw e;
        }
      })
      .then(result => {
        entities.forEach((entity: AggregateRoot) => {
          if (entity.getUncommittedEvents().length > 0) {
            this.logger.debug(
              `Comitting ${entity.getUncommittedEvents().length} event(s) for entity ${
                entity.constructor.name
              }`
            );

            this.eventPublisher.mergeObjectContext(entity);
            entity.commit();
          }
        });

        return result;
      });
  }
}

export const CommandBusProvider = {
  provide: 'CommandBusInterface',
  useExisting: TransactionalBus,
};
