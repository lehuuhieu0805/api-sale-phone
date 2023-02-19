import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDb1676781047316 implements MigrationInterface {
  name = 'initDb1676781047316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "phones" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_30d7fc09a458d7a4d9471bda554" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "price" int NOT NULL, "quantity" int NOT NULL, "image" nvarchar(255) NOT NULL, "status" nvarchar(255) NOT NULL, CONSTRAINT "PK_30d7fc09a458d7a4d9471bda554" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_a3ffb1c0c8416b9fc6f907b7433" DEFAULT NEWSEQUENTIALID(), "username" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "role" nvarchar(255) NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "phones"`);
  }
}
