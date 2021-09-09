import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SayHelloCommand } from '@application/greeting/say.hello.command';

@CommandHandler(SayHelloCommand)
export class SayHelloHandler implements ICommandHandler<SayHelloCommand> {
  async execute(command: SayHelloCommand): Promise<string> {
    const name = command.name || 'World';

    return `Hello, ${name} !`;
  }
}
