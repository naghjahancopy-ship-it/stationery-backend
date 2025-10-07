import { Request, Response } from "express";
import { AppDataSource } from "../../ormconfig";
import { Sale } from "../entity/Sale";
import { SaleItem } from "../entity/SaleItem";
import { Product } from "../entity/Product";
import { InventoryLog } from "../entity/InventoryLog";

const saleRepo = () => AppDataSource.getRepository(Sale);
const prodRepo = () => AppDataSource.getRepository(Product);
const invRepo = () => AppDataSource.getRepository(InventoryLog);

export const createSale = async (req: Request, res: Response) => {
  const { customer_name, items } = req.body;
  if(!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ error: "items required" });

  // compute total and apply stock changes
  let total = 0;
  const sale = saleRepo().create({ customer_name, total: 0 });
  sale.items = [];

  for(const it of items){
    let price = it.price;
    let qty = parseInt(it.qty);
    total += price * qty;

    const saleItem = new SaleItem();
    saleItem.qty = qty;
    saleItem.price = price;

    if(it.productId){
      const prod = await prodRepo().findOneBy({ id: it.productId });
      if(!prod) return res.status(400).json({ error: "product not found: " + it.productId });
      saleItem.product = prod;
      // decrease stock
      prod.stock = prod.stock - qty;
      await prodRepo().save(prod);
      // log inventory
      const log = invRepo().create({ product: prod, change: -qty, reason: 'sale' });
      await invRepo().save(log);
    }else if(it.serviceId){
      // service sale
      saleItem.service = { id: it.serviceId } as any;
    }

    sale.items.push(saleItem);
  }

  sale.total = total;
  const saved = await saleRepo().save(sale);
  res.status(201).json(saved);
};