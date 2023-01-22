import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1674351842991 implements MigrationInterface {
  name = 'default1674351842991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subjects" ADD CONSTRAINT "UQ_47a287fe64bd0e1027e603c335c" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subjects" DROP CONSTRAINT "UQ_47a287fe64bd0e1027e603c335c"`,
    );
  }
}
