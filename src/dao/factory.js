import config from "../config/config.js";
import mongoose from "mongoose";

export let Products;
switch (config.persistence) {
  case "MONGO":
    const connection = mongoose.connect(config.mongoUrl);
    const { default: ProductsMongo } = await import(
      "../dao/mongo/ManagerMongoDB.js"
    );
    Products = ProductsMongo;
    break;
  case "MEMORY":
    const { default: ProductsMemory } = await import(
      "./memory/products.memory.js"
    );
    Products = ProductsMemory;
    break;
}
export default Products;
