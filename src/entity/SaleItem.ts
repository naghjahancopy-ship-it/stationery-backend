import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Sale } from "./Sale";
import { Product } from "./Product";
import { Service } from "./Service";

@Entity()
export class SaleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sale, sale => sale.items, { onDelete: 'CASCADE' })
  @JoinColumn()
  sale: Sale;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn()
  product: Product | null;

  @ManyToOne(() => Service, { nullable: true })
  @JoinColumn()
  service: Service | null;

  @Column('int')
  qty: number;

  @Column('bigint')
  price: number;
}