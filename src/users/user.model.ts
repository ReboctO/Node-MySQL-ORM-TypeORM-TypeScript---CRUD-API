import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // Using `!` to tell TypeScript it will be assigned

  @Column({ type: "varchar", length: 100 })
  title!: string;

  @Column({ type: "varchar", length: 100 })
  firstName!: string;

  @Column({ type: "varchar", length: 100 })
  lastName!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255, select: false }) // Prevent exposing passwords
  passwordHash!: string;

  @Column({ type: "varchar", length: 20 })
  role!: string;
}
