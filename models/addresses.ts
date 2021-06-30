import { Schema } from "mongoose";

export interface IAddress {
  city?: string,
  cp?: string,
  street?: string,
}

const addressesSchema = new Schema<IAddress>({
  city: { type: String, required: true },
  cp: { type: String, required: true },
  street: { type: String, required: true },
}, {
  timestamps: false,
});

export default addressesSchema;


