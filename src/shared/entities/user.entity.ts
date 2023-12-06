import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: String,
  password: String,
  username: String,
  recordIds: [String],
  transactionIds: [String],
  wishListId: String,
});

export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  recordIds: string[];
  transactionIds: string[];
  wishListId: string;
}
