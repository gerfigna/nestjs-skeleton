import { CommandInterface } from '@domain/common/interface/command.interface';

export interface CommandBusInterface {
  execute<T extends CommandInterface>(command: T): Promise<any>;
}
