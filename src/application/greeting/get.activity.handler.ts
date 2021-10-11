import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetActivityCommand } from '@application/greeting/get.activity.command';
import { ActivityClientInterface } from '@domain/activity/interface/activity.client.interface';
import { Inject } from '@nestjs/common';
import { Activity } from '@domain/activity/model/activity';

@CommandHandler(GetActivityCommand)
export class GetActivityHandler implements ICommandHandler<GetActivityCommand> {
  constructor(
    @Inject('ActivityClientInterface')
    private readonly activityClient: ActivityClientInterface
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_: GetActivityCommand): Promise<Activity> {
    return this.activityClient.getActivity();
  }
}
