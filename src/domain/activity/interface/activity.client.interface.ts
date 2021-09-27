import { Activity } from '@domain/activity/model/activity';

export interface ActivityClientInterface {
  getActivity(): Promise<Activity>;
}
