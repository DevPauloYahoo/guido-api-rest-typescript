import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1673957410868 implements MigrationInterface {
  name = 'default1673957410868';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "videos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "url" text NOT NULL, "room_id" uuid, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "videos" ADD CONSTRAINT "pk_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "videos" DROP CONSTRAINT "pk_room_id"`,
    );
    await queryRunner.query(`DROP TABLE "rooms"`);
    await queryRunner.query(`DROP TABLE "videos"`);
  }
}
