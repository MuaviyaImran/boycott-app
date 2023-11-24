import { model, models } from "mongoose";
import productsSchema from "./products.schema";

const ProductModel = models.Product || model("Product", productsSchema);

export default ProductModel;
