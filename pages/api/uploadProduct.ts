import type { NextApiRequest, NextApiResponse } from "next/types";
import ProductModel from "../../models/products/products.model";
import dbConnect from "../database/conn";
export default async function uploadPostHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }
  try {
    const { name, image, counrtyOfProduction, category, email } = req.body;
    if (
      name &&
      image &&
      counrtyOfProduction &&
      category &&
      email &&
      email === process.env.ADMIN_EMAIL
    ) {
      await dbConnect();
      const newProduct = new ProductModel({
        name: name,
        image: image,
        counrtyOfProduction: counrtyOfProduction,
        category: category,
      });
      await newProduct.save();

      return res
        .status(200)
        .json({ success: true, message: "Upload successful" });
    } else {
      return res
        .status(405)
        .json({ success: false, error: "Parameters Missing" });
    }
  } catch (e) {
    if (e instanceof Error)
      return res.status(500).json({ success: false, error: e.message });
  }
}
