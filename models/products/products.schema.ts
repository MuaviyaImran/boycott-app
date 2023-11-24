import { Schema } from "mongoose";

const productsSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  counrtyOfProduction: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default productsSchema;
