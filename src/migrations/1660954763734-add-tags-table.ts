import {MigrationInterface, QueryRunner} from "typeorm";

export class addTagsTable1660954763734 implements MigrationInterface {
    name = 'addTagsTable1660954763734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`outflows_tags_tags\` (\`outflowsId\` int NOT NULL, \`tagsId\` int NOT NULL, INDEX \`IDX_6b490f4bf366da4d565068f0c7\` (\`outflowsId\`), INDEX \`IDX_c9d04550f6600c0def13524e05\` (\`tagsId\`), PRIMARY KEY (\`outflowsId\`, \`tagsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tags\` ADD CONSTRAINT \`FK_92e67dc508c705dd66c94615576\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`outflows_tags_tags\` ADD CONSTRAINT \`FK_6b490f4bf366da4d565068f0c78\` FOREIGN KEY (\`outflowsId\`) REFERENCES \`outflows\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`outflows_tags_tags\` ADD CONSTRAINT \`FK_c9d04550f6600c0def13524e053\` FOREIGN KEY (\`tagsId\`) REFERENCES \`tags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`outflows_tags_tags\` DROP FOREIGN KEY \`FK_c9d04550f6600c0def13524e053\``);
        await queryRunner.query(`ALTER TABLE \`outflows_tags_tags\` DROP FOREIGN KEY \`FK_6b490f4bf366da4d565068f0c78\``);
        await queryRunner.query(`ALTER TABLE \`tags\` DROP FOREIGN KEY \`FK_92e67dc508c705dd66c94615576\``);
        await queryRunner.query(`DROP INDEX \`IDX_c9d04550f6600c0def13524e05\` ON \`outflows_tags_tags\``);
        await queryRunner.query(`DROP INDEX \`IDX_6b490f4bf366da4d565068f0c7\` ON \`outflows_tags_tags\``);
        await queryRunner.query(`DROP TABLE \`outflows_tags_tags\``);
        await queryRunner.query(`DROP TABLE \`tags\``);
    }

}
