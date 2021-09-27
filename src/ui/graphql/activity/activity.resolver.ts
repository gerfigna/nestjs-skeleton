import { Query, Resolver } from '@nestjs/graphql';
import { CommandBusInterface } from '@domain/common/interface/command.bus.interface';
import { Inject } from '@nestjs/common';
import { GetActivityCommand } from '@application/greeting/get.activity.command';
import { ActivityResponse } from '@ui/graphql/activity/response/activity.response';

@Resolver()
export class ActivityResolver {
  constructor(@Inject('CommandBusInterface') private readonly commandBus: CommandBusInterface) {}

  @Query(() => ActivityResponse)
  async getActivity(): Promise<ActivityResponse> {
    return this.commandBus.execute(new GetActivityCommand());
  }
}
