import type { NextApiRequest, NextApiResponse } from "next/types";
import SuggestionModel from "models/suggestions/suggestion.model";
import dbConnect from "../database/conn";

export default async function getSuggestionHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const suggestions = await SuggestionModel.find({});

      if (suggestions.length === 0) {
        return res.status(200).json([]);
      }

      return res.status(200).json(suggestions);
    } catch (error) {
      return res.status(400).json({ message: "Failed to get suggestions." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
