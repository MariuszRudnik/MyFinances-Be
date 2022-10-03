"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    type: 'mysql',
    host: 'db',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'admin',
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    synchronize: true,
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map