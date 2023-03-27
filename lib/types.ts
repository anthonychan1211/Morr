import { type } from "os";
import React from "react";

export type DocumentObject = Array<{ [key: string]: string | string[] }>;
export type SingleObject = { [key: string]: string | string[] | number };
export type Product = {
  id: number;
  name: string;
  price: number;
  discount: boolean;
  price_after_discount: number | null;
  description: string | null;
  material: string[] | null;
  colour: string[] | null;
  cover_photo: string;
  gallery: string[] | null;
  quantity: number | null;
  category: string;
  product_care: string | null;
  product_style: string | null;
};
export type SetBagItem = React.Dispatch<React.SetStateAction<Product[]>>;
export type UserDataType = {
  role: string;
  id: string;
};
export type StateBoolean = React.SetStateAction<boolean>;
export type SetStateBoolean = React.Dispatch<React.SetStateAction<boolean>>;
export type SetStateNumber = React.Dispatch<React.SetStateAction<number>>;
export type SetStateAddProductModal = React.Dispatch<
  React.SetStateAction<number | string | null>
>;
export type UserData = {
  role: string;
  id: string;
};
export type CartItem = {
  id?: number;
  user_id: string;
  product_id: number;
  quantity: number;
};
export type RemoveItem = {
  id: number;
  user_id: string;
  product_id: number;
  quantity: number;
};
export type SetBag = React.Dispatch<React.SetStateAction<CartItem[]>>;
export type AddProductModal = number | string | null;
export type SetStateString = React.Dispatch<React.SetStateAction<string>>;
export type SetStateStringArray = React.Dispatch<
  React.SetStateAction<string[]>
>;

export type SetStateDocumentObject = React.Dispatch<
  React.SetStateAction<DocumentObject>
>;
export interface FilterSelected {
  [key: string]: string[];
}
