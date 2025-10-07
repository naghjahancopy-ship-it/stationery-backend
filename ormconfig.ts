import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

import { User } from "./src/entity/User";
import { Product } from "./src/entity/Product";
import { Service } from "./src/entity/Service";
import { Sale } from "./src/entity/Sale";
import { SaleItem } from "./src/entity/SaleItem";
import { InventoryLog } from "./src/entity/InventoryLog";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [User, Product, Service, Sale, SaleItem, InventoryLog],
  migrations: ["dist/migrations/*.js"],
  subscribers: []
});