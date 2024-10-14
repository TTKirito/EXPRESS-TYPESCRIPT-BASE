import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
  PrimaryColumn,
  OneToOne,
} from "typeorm";
import { BaseModel } from "./BaseModel";
import { Role } from "./role";
import { User } from "./user";

@Entity({ name: "user_roles" })
export class UserRole extends BaseModel {
  @PrimaryGeneratedColumn()
  public id: number;

  @PrimaryColumn({ type: "int" })
  role_id: number;

  @PrimaryColumn({ type: "int" })
  user_id: number;

  @OneToOne(() => User)
  @JoinTable({ name: "users" })
  user: User;

  @OneToOne(() => Role)
  @JoinTable({ name: "roles" })
  role: Role;

  @CreateDateColumn({ name: "created_date" })
  created_date?: Date;

  @UpdateDateColumn({ name: "modified_date" })
  modified_date?: Date;

  @DeleteDateColumn({ name: "delete_date" })
  delete_date?: Date;
}
