import {MigrationInterface, QueryRunner} from "typeorm";

export class regiterFeatureEasier1664557451235 implements MigrationInterface {
    name = 'regiterFeatureEasier1664557451235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_8ba1eab72ad9e9c722e67d4a8db\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`documentNumber\` \`documentNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`bornDate\` \`bornDate\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`documentTypeId\` \`documentTypeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_8ba1eab72ad9e9c722e67d4a8db\` FOREIGN KEY (\`documentTypeId\`) REFERENCES \`documenttypes\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_8ba1eab72ad9e9c722e67d4a8db\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`documentTypeId\` \`documentTypeId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`bornDate\` \`bornDate\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`documentNumber\` \`documentNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_8ba1eab72ad9e9c722e67d4a8db\` FOREIGN KEY (\`documentTypeId\`) REFERENCES \`documenttypes\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
