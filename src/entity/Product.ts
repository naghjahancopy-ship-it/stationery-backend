import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  name!: string;
  
  @Column()
  sku!: string;
  
  @Column("decimal")
  price!: number;
  
  @Column("decimal")
  cost!: number;
  
  @Column()
  stock!: number;
  
  @CreateDateColumn()
  created_at!: Date;
  
  @UpdateDateColumn()
  updated_at!: Date;
}
