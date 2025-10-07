import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from "typeorm";
import { User } from "./User";
import { SaleItem } from "./SaleItem";

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  customer_name: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => SaleItem, item => item.sale, { cascade: true })
  items: SaleItem[];

  @Column('bigint', { default: 0 })
  total: number;

  @CreateDateColumn()
  created_at: Date;
}