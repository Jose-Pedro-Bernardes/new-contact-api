import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import User from "./users.entity";

@Entity("contacts")
class Contact {
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

  @ManyToOne(() => User)
  user: User;
}

export default Contact;
