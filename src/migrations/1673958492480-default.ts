import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1673958492480 implements MigrationInterface {
  name = 'default1673958492480';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "url"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subjects" ADD "url" text NOT NULL`);
  }
}
