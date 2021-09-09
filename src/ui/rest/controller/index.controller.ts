import { Controller, Get, Inject, Query } from '@nestjs/common';
import { CommandBusInterface } from '@domain/common/interface/command.bus.interface';
import { SayHelloCommand } from '@application/greeting/say.hello.command';

@Controller('api')
export class IndexController {
  constructor(
    @Inject('CommandBusInterface')
    private readonly commandBus: CommandBusInterface
  ) {}

  @Get('/hi')
  async multisafepayPaymentNotification(@Query('name') name: string): Promise<string> {
    return this.commandBus.execute(new SayHelloCommand(name));
  }
}
