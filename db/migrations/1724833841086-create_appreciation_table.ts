import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppreciationTable1724833841086 implements MigrationInterface {
    name = 'CreateAppreciationTable1724833841086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`appreciation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quality\` int NOT NULL, \`Feedback\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`appreciation\``);
    }

}
