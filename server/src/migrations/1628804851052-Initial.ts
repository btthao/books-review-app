import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1628804851052 implements MigrationInterface {
    name = 'Initial1628804851052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rating" ("value" integer NOT NULL, "userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_e4479e8ff131a40553fc0b08794" PRIMARY KEY ("userId", "bookId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "plot" character varying NOT NULL, "year" integer NOT NULL, "totalRaters" integer NOT NULL DEFAULT '0', "totalStars" integer NOT NULL DEFAULT '0', "posterId" integer, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_bookmarks_book" ("userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_40a057d1374cf14cac42eac0ded" PRIMARY KEY ("userId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7dd7d3e8ca84df602926e3fe16" ON "user_bookmarks_book" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b4cf8587529eef3bff30524771" ON "user_bookmarks_book" ("bookId") `);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_2ab7f7fc5b63b0147591ba69032" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_f93f6778c73a7af84b814b52c6d" FOREIGN KEY ("posterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_bookmarks_book" ADD CONSTRAINT "FK_7dd7d3e8ca84df602926e3fe16c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_bookmarks_book" ADD CONSTRAINT "FK_b4cf8587529eef3bff30524771a" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_bookmarks_book" DROP CONSTRAINT "FK_b4cf8587529eef3bff30524771a"`);
        await queryRunner.query(`ALTER TABLE "user_bookmarks_book" DROP CONSTRAINT "FK_7dd7d3e8ca84df602926e3fe16c"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_f93f6778c73a7af84b814b52c6d"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_2ab7f7fc5b63b0147591ba69032"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"`);
        await queryRunner.query(`DROP INDEX "IDX_b4cf8587529eef3bff30524771"`);
        await queryRunner.query(`DROP INDEX "IDX_7dd7d3e8ca84df602926e3fe16"`);
        await queryRunner.query(`DROP TABLE "user_bookmarks_book"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "rating"`);
    }

}
