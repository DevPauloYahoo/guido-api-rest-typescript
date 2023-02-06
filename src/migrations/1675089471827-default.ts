import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1675089471827 implements MigrationInterface {
  name = 'default1675089471827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users"
       (
         "id"       uuid NOT NULL DEFAULT uuid_generate_v4(),
         "name"     text NOT NULL,
         "email"    text NOT NULL,
         "password" text NOT NULL,
--          "roles"    "public"."users_roles_enum" NOT NULL DEFAULT 'user',
         CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
         CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
       )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
