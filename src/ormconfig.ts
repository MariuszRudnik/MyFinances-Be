import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 8889,
  username: 'root',
  password: 'root',
  database: 'nowy',
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  synchronize: true,
};
export default config;
