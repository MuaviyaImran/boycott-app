import type { NextApiRequest, NextApiResponse } from "next/types";
import SuggestionModel from "models/suggestions/suggestion.model";
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
    const { name } = req.body;
    if (name) {
      await dbConnect();
      const newSuggestedProduct = new SuggestionModel({
        name: name,
      });
      await newSuggestedProduct.save();

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
