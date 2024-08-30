import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDb1724834330889 implements MigrationInterface {
    name = 'UpdateDb1724834330889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`appreciation\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`appreciation\` ADD UNIQUE INDEX \`IDX_80f2d8f3a72d258529cb117f3a\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_80f2d8f3a72d258529cb117f3a\` ON \`appreciation\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`appreciation\` ADD CONSTRAINT \`FK_80f2d8f3a72d258529cb117f3a3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`appreciation\` DROP FOREIGN KEY \`FK_80f2d8f3a72d258529cb117f3a3\``);
        await queryRunner.query(`DROP INDEX \`REL_80f2d8f3a72d258529cb117f3a\` ON \`appreciation\``);
        await queryRunner.query(`ALTER TABLE \`appreciation\` DROP INDEX \`IDX_80f2d8f3a72d258529cb117f3a\``);
        await queryRunner.query(`ALTER TABLE \`appreciation\` DROP COLUMN \`userId\``);
    }

}
