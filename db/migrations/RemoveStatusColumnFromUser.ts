import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveStatusColumnFromUser1689456789012 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", "status");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("user", new TableColumn({
            name: "status",
            type: "int",
            isNullable: true,
            default: 1,
        }));
    }

}
