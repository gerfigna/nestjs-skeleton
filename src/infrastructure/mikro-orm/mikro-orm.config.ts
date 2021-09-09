import { User } from '@domain/greeting/entity/user.entity';

export default {
  type: 'mysql',
  clientUrl: process.env.MYSQL_URL,
  entities: [User],
  migrations: {
    path: './src/infrastructure/mikro-orm/migrations',
  },
};
