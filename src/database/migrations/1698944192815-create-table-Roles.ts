import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableRoles1698944192815 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
            CREATE TABLE roles( 
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(225),
                created_date TIMESTAMP NOT NULL DEFAULT NOW(), 
                modified_date TIMESTAMP NOT NULL DEFAULT NOW(),
                delete_date TIMESTAMP DEFAULT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`DROP TABLE Roles`);
  }
}
