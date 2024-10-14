import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableUserRoles1698944199121 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
            CREATE TABLE user_roles( 
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                user_id INT NOT NULL,
                role_id INT NOT NULL,
                created_date TIMESTAMP NOT NULL DEFAULT NOW(), 
                modified_date TIMESTAMP NOT NULL DEFAULT NOW(),
                delete_date TIMESTAMP DEFAULT NULL
            );

            ALTER TABLE user_roles ADD CONSTRAINT FK_role_id FOREIGN KEY (role_id) REFERENCES roles (id);
            ALTER TABLE user_roles ADD CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users (id);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`DROP TABLE user_roles`);
  }
}
