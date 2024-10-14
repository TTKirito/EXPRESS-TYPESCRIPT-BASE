import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableUsers1698944119935 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
            CREATE TABLE users( 
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                dislay_name VARCHAR(225),
                user_name VARCHAR(225),
                status VARCHAR(250),
                email VARCHAR(255), 
                phone VARCHAR(20),
                created_date TIMESTAMP NOT NULL DEFAULT NOW(), 
                modified_date TIMESTAMP NOT NULL DEFAULT NOW(),
                delete_date TIMESTAMP DEFAULT NULL,
                login_with_socies VARCHAR(255),
                image VARCHAR(250),
                hash VARCHAR(250)
            );

        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`DROP TABLE Users`);
  }
}
