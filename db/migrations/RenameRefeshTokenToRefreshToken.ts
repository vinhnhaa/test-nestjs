import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameRefeshTokenToRefreshToken1697496735750 implements MigrationInterface {
  name = 'RenameRefeshTokenToRefreshToken1697496735750';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refesh_token\` \`refresh_token\` VARCHAR(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refesh_token\` VARCHAR(255)`);
  }
}
