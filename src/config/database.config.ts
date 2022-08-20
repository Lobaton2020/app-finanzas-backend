import { registerAs } from '@nestjs/config';
import path = require('path');
import { Traceability } from 'src/common/entities/Traceability.entity';
import { Deposit } from 'src/inflows/entities/Deposit.entity';
import { InflowDeposit } from 'src/inflows/entities/InflowDeposit.entity';
import { Inflow } from 'src/inflows/entities/Intflow.entity';
import { InflowType } from 'src/inflows/entities/IntflowType.entity';
import { Category } from 'src/outflows/entities/Category.entity';
import { Outflow } from 'src/outflows/entities/Outflow.entity';
import { OutflowType } from 'src/outflows/entities/OutflowType.entity';
import { Tag } from 'src/outflows/entities/Tag.entity';
import { DocumentType } from 'src/users/entities/DocumentType.entity';
import { Rol } from 'src/users/entities/Rol.entity';
import { User } from 'src/users/entities/User.entity';
import { DATABASE_CONFIG, DEV_KEY } from './constants.config';

export default registerAs(DATABASE_CONFIG, () => {
  return {
    type: "mysql",
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "root",
    database: process.env.DATABASE_NAME || "test",
    synchronize: process.env.NODE_ENV === DEV_KEY ? true : false,
    logging: process.env.NODE_ENV === DEV_KEY ? true : false,
    autoLoadEntities: process.env.NODE_ENV === DEV_KEY ? true : false,
    cli: {
      migrationsDir: 'src/migrations/',
    },
    entities: process.env.NODE_ENV === DEV_KEY ? ["dist/**/*.entity{.ts,.js}" ]:[
      DocumentType,
      Rol,
      User,
      Inflow,
      InflowDeposit,
      Deposit,
      InflowType,
      Outflow,
      OutflowType,
      Category,
      Traceability,
      Tag
    ],
    migrationsRun: false,
    migrations: [
      path.resolve(__dirname+'/../migrations/*.js')
    ]
  }
});