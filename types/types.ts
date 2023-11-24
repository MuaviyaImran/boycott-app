import { Timestamp } from "bson";
import mongoose from "mongoose";
import { ReactNode } from "react";

export type signInParams = {
  email?: string;
  password?: string;
};
export type ProductType = {
  name: string;
  category: string;
  image: string;
  counrtyOfProduction: string;
  uploadedAt?: Timestamp;
  _id?: mongoose.ObjectId;
};

export interface TokenUser {
  name?: string;
  email?: string;
  image?: string;
}
export interface ErrorPageProps {
  text: string;
}
export interface LayoutProps {
  children: ReactNode;
}
export interface SuggestionModalTypes {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ProductInventoryTypes {
  _id: string;
  name: string;
  category: string;
  counrtyOfProduction: string;
  uploadedAt: string;
  image?: string;
  __v?: number;
}
export interface SuggestionsTypes {
  _id: string;
  name: string;
  uploadedAt: string;
  __v?: number;
}
