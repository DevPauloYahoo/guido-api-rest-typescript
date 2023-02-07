import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablesVideoProfileAndRole1675774948016
  implements MigrationInterface
{
  name = 'AlterTablesVideoProfileAndRole1675774948016';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles"
        DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7"`,
    );
    await queryRunner.query(`ALTER TABLE "roles"
      DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "roles"
      ADD "name" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "roles"
        ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name")`,
    );
    await queryRunner.query(`ALTER TABLE "roles"
      DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "roles"
      ADD "description" text`);
    await queryRunner.query(
      `ALTER TABLE "videos"
        ADD CONSTRAINT "UQ_dc72d97ea7e7f484c8ea32049c6" UNIQUE ("title")`,
    );
    await queryRunner.query(
      `ALTER TABLE "videos"
        ADD CONSTRAINT "UQ_517d52e875e32f23347054eb285" UNIQUE ("url")`,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles"
        DROP CONSTRAINT "UQ_4e9da7cade0e9edd393329bb326"`,
    );
    await queryRunner.query(`ALTER TABLE "profiles"
      DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "profiles"
      ADD "name" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "profiles"
        ADD CONSTRAINT "UQ_4e9da7cade0e9edd393329bb326" UNIQUE ("name")`,
    );
    await queryRunner.query(`ALTER TABLE "profiles"
      DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "profiles"
      ADD "description" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profiles"
      DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "profiles"
        ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles"
        DROP CONSTRAINT "UQ_4e9da7cade0e9edd393329bb326"`,
    );
    await queryRunner.query(`ALTER TABLE "profiles"
      DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "profiles"
        ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles"
        ADD CONSTRAINT "UQ_4e9da7cade0e9edd393329bb326" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "videos"
        DROP CONSTRAINT "UQ_517d52e875e32f23347054eb285"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videos"
        DROP CONSTRAINT "UQ_dc72d97ea7e7f484c8ea32049c6"`,
    );
    await queryRunner.query(`ALTER TABLE "roles"
      DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "roles"
        ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles"
        DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7"`,
    );
    await queryRunner.query(`ALTER TABLE "roles"
      DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "roles"
        ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles"
        ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name")`,
    );
  }
}
