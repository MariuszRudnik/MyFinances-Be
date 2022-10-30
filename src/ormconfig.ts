import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'admin',
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  synchronize: true,
};
export default config;
