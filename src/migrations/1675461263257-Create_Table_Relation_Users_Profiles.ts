import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRelationUsersProfiles1675461263257
  implements MigrationInterface
{
  name = 'CreateTableRelationUsersProfiles1675461263257';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_profiles" ("user_id" uuid NOT NULL, "profile_id" uuid NOT NULL, CONSTRAINT "PK_0fe5331b53f70d74ca5414e307d" PRIMARY KEY ("user_id", "profile_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_181a055631e557898c3eea0f37" ON "users_profiles" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ce29b0c6e048b2ce2bc6996493" ON "users_profiles" ("profile_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_profiles" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_profiles" ADD CONSTRAINT "fk_profile_id" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_profiles" DROP CONSTRAINT "fk_profile_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_profiles" DROP CONSTRAINT "fk_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ce29b0c6e048b2ce2bc6996493"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_181a055631e557898c3eea0f37"`,
    );
    await queryRunner.query(`DROP TABLE "users_profiles"`);
  }
}
