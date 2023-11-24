import type { NextApiRequest, NextApiResponse } from "next/types";
import SuggestionModel from "models/suggestions/suggestion.model";
import dbConnect from "../database/conn";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const suggestionID = req.query.suggestionID;
    try {
      await dbConnect();
      await SuggestionModel.deleteOne({ _id: suggestionID });

      return res
        .status(200)
        .json({ message: "Suggestion deleted successfully." });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Failed to delete the suggestion." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
