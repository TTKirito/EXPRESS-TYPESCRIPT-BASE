import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { BaseModel } from "./BaseModel";
import { User } from "./user";

@Entity({ name: "tokens" })
export class Token extends BaseModel {
  @PrimaryGeneratedColumn()
  public id: number;

  @PrimaryColumn({ type: "int" })
  user_id: number;

  @Column()
  refresh_token: string;

  @CreateDateColumn({ name: "created_date" })
  created_date?: Date;

  @UpdateDateColumn({ name: "modified_date" })
  modified_date?: Date;

  @DeleteDateColumn({ name: "delete_date" })
  delete_date?: Date;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User
}
