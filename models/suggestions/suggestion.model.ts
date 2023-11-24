import { model, models } from "mongoose";
import suggestionSchema from "./suggestion.schema";

const SuggestionModel =
  models.Suggestion || model("Suggestion", suggestionSchema);

export default SuggestionModel;
