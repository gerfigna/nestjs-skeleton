import { Migration } from '@mikro-orm/migrations';

export class Migration20210909094922 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `user` (`uuid` varchar(255) not null, `name` varchar(255) not null) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql('alter table `user` add primary key `user_pkey`(`uuid`);');
  }
}
