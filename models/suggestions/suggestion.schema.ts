import { Schema } from "mongoose";

const suggestionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default suggestionSchema;
