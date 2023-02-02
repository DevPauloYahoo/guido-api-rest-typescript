import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1675305260899 implements MigrationInterface {
  name = 'default1675305260899';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "profiles_roles" ("profile_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_daf21b0e289b302d0212f74dafb" PRIMARY KEY ("profile_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_32c344f6afd31cbad840f395e5" ON "profiles_roles" ("profile_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d6231462cd47a9d996b45ffeab" ON "profiles_roles" ("role_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles_roles" ADD CONSTRAINT "FK_PROFILE_ID" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles_roles" ADD CONSTRAINT "FK_ROLE_ID" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profiles_roles" DROP CONSTRAINT "FK_ROLE_ID"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles_roles" DROP CONSTRAINT "FK_PROFILE_ID"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d6231462cd47a9d996b45ffeab"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_32c344f6afd31cbad840f395e5"`,
    );
    await queryRunner.query(`DROP TABLE "profiles_roles"`);
  }
}
