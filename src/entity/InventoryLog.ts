import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class InventoryLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column('int')
  change: number;

  @Column({ nullable: true })
  reason: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  created_at: Date;
}