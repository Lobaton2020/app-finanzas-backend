import {MigrationInterface, QueryRunner} from "typeorm";

export class traceabilityUpdate1645916641974 implements MigrationInterface {
    name = 'traceabilityUpdate1645916641974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`traceabilities\` ADD \`body\` mediumtext NULL`);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` ADD \`bodyResponse\` mediumtext NULL`);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` DROP COLUMN \`method\``);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` ADD \`method\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` DROP COLUMN \`clientIp\``);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` ADD \`clientIp\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` ADD \`url\` mediumtext NULL`);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` DROP COLUMN \`reqHeaders\``);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` ADD \`reqHeaders\` mediumtext NULL`);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` DROP COLUMN \`resHeaders\``);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` ADD \`resHeaders\` mediumtext NULL`);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` CHANGE \`statusCode\` \`statusCode\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`traceabilities\` CHANGE \`statusCode\` \`statusCode\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` DROP COLUMN \`resHeaders\``);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` ADD \`resHeaders\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` DROP COLUMN \`reqHeaders\``);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` ADD \`reqHeaders\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` ADD \`url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` DROP COLUMN \`clientIp\``);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` ADD \`clientIp\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` DROP COLUMN \`method\``);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` ADD \`method\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` DROP COLUMN \`bodyResponse\``);
        await queryRunner.query(`ALTER TABLE \`traceabilities\` DROP COLUMN \`body\``);
    }

}
