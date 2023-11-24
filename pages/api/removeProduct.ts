import type { NextApiRequest, NextApiResponse } from "next/types";
import ProductModel from "models/products/products.model";
import dbConnect from "../database/conn";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const productID = req.query.productID;
    try {
      await dbConnect();
      await ProductModel.deleteOne({ _id: productID });

      return res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
      return res.status(400).json({ message: "Failed to delete the product." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
