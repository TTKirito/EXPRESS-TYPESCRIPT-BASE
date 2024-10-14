import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { BaseModel } from "./BaseModel";
import { User } from "./user";

@Entity({ name: "roles" })
export class Role extends BaseModel {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: "created_date" })
  created_date?: Date;

  @UpdateDateColumn({ name: "modified_date" })
  modified_date?: Date;

  @DeleteDateColumn({ name: "delete_date" })
  delete_date?: Date;

  @ManyToMany((_type) => User)
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
  users: User[];
}
