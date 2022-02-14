import { registerAs } from '@nestjs/config';
import path = require('path');
import { Traceability } from 'src/admin/entities/Traceability.entity';
import { Deposit } from 'src/inflows/entities/Deposit.entity';
import { InflowDeposit } from 'src/inflows/entities/InflowDeposit.entity';
import { Inflow } from 'src/inflows/entities/Intflow.entity';
import { InflowType } from 'src/inflows/entities/IntflowType.entity';
import { Category } from 'src/outflows/entities/Category.entity';
import { Outflow } from 'src/outflows/entities/Outflow.entity';
import { OutflowType } from 'src/outflows/entities/OutflowType.entity';
import { DocumentType } from 'src/user/entities/DocumentType.entity';
import { Rol } from 'src/user/entities/Rol.entity';
import { User } from 'src/user/entities/User.entity';
import { DATABASE_CONFG, DEV_KEY } from './constants.config';
export default registerAs(DATABASE_CONFG, () => {
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
      Traceability
    //  path.resolve(__dirname+'/../**/**/*.entity{.ts,.js}')
      // './**/*.entity{.ts,.js}'
    ],
    migrationsRun: false,
    migrations: [
      path.resolve(__dirname+'/../migrations/*.js')
    ]
  }
});