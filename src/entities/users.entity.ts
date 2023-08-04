import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

import { getRounds, hashSync } from "bcryptjs";

import Contact from "./contacts.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 45 })
  full_name: string;

  @Column({ type: "varchar", length: 125, unique: true })
  email: string;

  @Column({ type: "varchar", length: 11, unique: true })
  phone_number: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @Column({ type: "boolean", default: false })
  admin: boolean;

  @OneToMany(() => Contact, (contacts) => contacts.user, { nullable: true })
  contacts: Contact[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);

    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export default User;
