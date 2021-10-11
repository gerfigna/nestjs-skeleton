import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ActivityClientInterface } from '@domain/activity/interface/activity.client.interface';
import { Activity } from '@domain/activity/model/activity';
@Injectable()
export class BoredApiClient implements ActivityClientInterface {
  constructor(
    private readonly httpService: HttpService,
    private readonly baseUri: string,
    private readonly username: string,
    private readonly password: string
  ) {}

  async getActivity(): Promise<Activity> {
    return new Promise((resolve, reject) => {
      this.httpService
        .get(`${this.baseUri}/activity`, {
          auth: {
            username: this.username,
            password: this.password,
          },
        })
        .toPromise()
        .then(result => {
          return resolve(result.data);
        })
        .catch(e => {
          reject(new Error(`Activity API failed <"${e.message}">`));
        });
    });
  }
}

export const ActivityClientProvider = {
  provide: 'ActivityClientInterface',
  inject: [ConfigService, HttpService],
  useFactory: (configService: ConfigService, httpService: HttpService): BoredApiClient => {
    return new BoredApiClient(
      httpService,
      configService.get<string>('BORED_API_BASE_URI'),
      configService.get<string>('BORED_API_USERNAME'),
      configService.get<string>('BORED_API_PASSWORD')
    );
  },
};
