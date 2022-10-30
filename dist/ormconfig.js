"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    type: 'mysql',
    host: 'localhost',
    port: 8889,
    username: 'root',
    password: 'root',
    database: 'nowy',
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    synchronize: true,
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map