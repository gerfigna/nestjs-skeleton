import { Args, Query, Resolver } from '@nestjs/graphql';
import { CommandBusInterface } from '@domain/common/interface/command.bus.interface';
import { Inject } from '@nestjs/common';
import { SayHelloCommand } from '@application/greeting/say.hello.command';

@Resolver()
export class HelloResolver {
  constructor(@Inject('CommandBusInterface') private readonly commandBus: CommandBusInterface) {}

  @Query(() => String)
  async sayHello(@Args('name', { nullable: true }) name: string): Promise<string> {
    return this.commandBus.execute(new SayHelloCommand(name));
  }
}
