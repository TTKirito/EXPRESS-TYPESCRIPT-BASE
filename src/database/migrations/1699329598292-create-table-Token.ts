import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableToken1699329598292 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE Tokens( 
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                user_id INT NOT NULL,
                refresh_token TEXT,
                created_date TIMESTAMP NOT NULL DEFAULT NOW(), 
                modified_date TIMESTAMP NOT NULL DEFAULT NOW(),
                delete_date TIMESTAMP DEFAULT NULL
            );

            ALTER TABLE Tokens ADD CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users (id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE Tokens`);
    }

}
