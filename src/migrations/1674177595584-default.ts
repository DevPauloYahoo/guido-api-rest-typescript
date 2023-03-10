import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1674177595584 implements MigrationInterface {
  name = 'default1674177595584';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subjects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "videos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "url" text NOT NULL, "room_id" uuid, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "description" text, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "room_subject" ("room_id" uuid NOT NULL, "subject_id" uuid NOT NULL, CONSTRAINT "PK_6b3738a7b93c77fd6d9333b638a" PRIMARY KEY ("room_id", "subject_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f227421d2ef64ab086261ac07f" ON "room_subject" ("room_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a05f10c497f5f7db3022664a6d" ON "room_subject" ("subject_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "videos" ADD CONSTRAINT "pk_room_id" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_subject" ADD CONSTRAINT "PK_ROOM_ID" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_subject" ADD CONSTRAINT "PK_SUBJECT_ID" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "room_subject" DROP CONSTRAINT "PK_SUBJECT_ID"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_subject" DROP CONSTRAINT "PK_ROOM_ID"`,
    );
    await queryRunner.query(
      `ALTER TABLE "videos" DROP CONSTRAINT "pk_room_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a05f10c497f5f7db3022664a6d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f227421d2ef64ab086261ac07f"`,
    );
    await queryRunner.query(`DROP TABLE "room_subject"`);
    await queryRunner.query(`DROP TABLE "rooms"`);
    await queryRunner.query(`DROP TABLE "videos"`);
    await queryRunner.query(`DROP TABLE "subjects"`);
  }
}
