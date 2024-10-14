import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from "typeorm";
import { LOGIN_SOCIES, USER_STATUS } from "../../constants/enum";
import { BaseModel } from "./BaseModel";
import { Role } from "./role";

@Entity({ name: "users" })
export class User extends BaseModel {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  dislay_name?: string;

  @Column()
  user_name?: string;

  @Column("text")
  status?: USER_STATUS;
  @BeforeInsert()
  beforeInsertActions() {
    this.status = USER_STATUS.ACTIVE;
  }

  @Column()
  email?: string;

  @CreateDateColumn({ name: "created_date" })
  created_date?: Date;

  @UpdateDateColumn({ name: "modified_date" })
  modified_date?: Date;

  @DeleteDateColumn({ name: "delete_date" })
  delete_date?: Date;

  @Column()
  image?: string;

  @Column("text")
  login_with_socies?: LOGIN_SOCIES;

  @Column()
  phone?: string;

  @ManyToMany((_type) => Role)
  @JoinTable({
    name: "user_roles",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
  })
  roles?: Role[];

  @Column()
  hash?: string;
}
