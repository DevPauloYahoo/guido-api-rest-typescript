import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1675294747054 implements MigrationInterface {
  name = 'default1675294747054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
    await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_roles_enum" AS ENUM('user', 'admin')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "roles" "public"."users_roles_enum" NOT NULL DEFAULT 'user'`,
    );
  }
}
