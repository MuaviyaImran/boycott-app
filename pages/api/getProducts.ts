import type { NextApiRequest, NextApiResponse } from "next/types";
import ProductModel from "models/products/products.model";
import dbConnect from "../database/conn";
export default async function getProductHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const products = await ProductModel.find({});

      if (products.length === 0) {
        return res.status(200).json([]);
      }

      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json({ message: "Failed to get products." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
