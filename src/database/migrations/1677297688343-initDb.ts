import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDb1677297688343 implements MigrationInterface {
  name = 'initDb1677297688343';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_a3ffb1c0c8416b9fc6f907b7433" DEFAULT NEWSEQUENTIALID(), "username" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "role" nvarchar(255) NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_710e2d4957aa5878dfe94e4ac2f" DEFAULT NEWSEQUENTIALID(), "totalPrice" int NOT NULL, "totalQuantity" int NOT NULL, "dateCreated" datetime NOT NULL, "status" nvarchar(255) NOT NULL, "userId" uniqueidentifier NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_items" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_005269d8574e6fac0493715c308" DEFAULT NEWSEQUENTIALID(), "quantity" int NOT NULL, "price" int NOT NULL, "orderId" uniqueidentifier NOT NULL, "phoneId" uniqueidentifier NOT NULL, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "phones" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_30d7fc09a458d7a4d9471bda554" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "price" int NOT NULL, "quantity" int NOT NULL, "image" nvarchar(255) NOT NULL, "status" nvarchar(255) NOT NULL, CONSTRAINT "PK_30d7fc09a458d7a4d9471bda554" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD CONSTRAINT "FK_db88f170918867dc32627280a60" FOREIGN KEY ("phoneId") REFERENCES "phones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP CONSTRAINT "FK_db88f170918867dc32627280a60"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`,
    );
    await queryRunner.query(`DROP TABLE "phones"`);
    await queryRunner.query(`DROP TABLE "order_items"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
