import {
  AddProductModal,
  DocumentObject,
  SetStateAddProductModal,
  SingleObject,
} from "@/lib/types";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { StyledAddProduct } from "./styles";

const AddProduct = ({
  setAddProductModal,
  addProductModal,
  products,
}: {
  setAddProductModal: SetStateAddProductModal;
  addProductModal: AddProductModal;
  products: DocumentObject;
}) => {
  const [form, setForm] = useState<SingleObject>({});
  const [selectedProduct, setSelectedProduct] = useState<SingleObject>({});
  useEffect(() => {
    if (addProductModal !== "new" || addProductModal !== null) {
      const product = products.filter((el) => {
        return el.id == addProductModal;
      });
      setSelectedProduct(product[0]);
      setForm(product[0]);
    }
  }, [addProductModal, products]);
  async function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let typedForm;
    if (addProductModal !== "new") {
      typedForm = {
        id: parseInt(addProductModal as string),
      };
    }
    typedForm = {
      ...form,
      price: typeof form.price === "string" ? parseInt(form.price) : form.price,
      discount:
        typeof form.discount === "string"
          ? (form.discount as string).toLowerCase() === "true" ||
            (form.discount as string).toLowerCase() === "yes"
          : form.discount,
      gallery:
        typeof form.gallery === "string"
          ? (form.gallery as string)
              .split(",")
              .reduce(
                (accu: string[], curr) =>
                  curr !== ""
                    ? [...accu, curr.trim().replace(/(\r\n|\n|\r)/gm, "")]
                    : [...accu],
                []
              ) || null
          : form.gallery,
      colour:
        typeof form.colour === "string"
          ? (form.colour as string)
              .split(",")
              .reduce(
                (accu: string[], curr) =>
                  curr !== "" ? [...accu, curr.trim()] : [...accu],
                []
              ) || null
          : form.colour,
      material:
        typeof form.material === "string"
          ? form.material
              .split(",")
              .reduce(
                (accu: string[], curr) =>
                  curr !== "" ? [...accu, curr.trim()] : [...accu],
                []
              ) || null
          : form.material,
      quantity: parseInt(form.quantity as string) || null,
    };
    console.log(typedForm);
    const res = await fetch("/api/addRecord", {
      method: "POST",
      body: JSON.stringify(typedForm),
    });
    const feedBack = await res.json();
    console.log(feedBack);
    if (feedBack) window.location.reload();
  }
  console.log(form);
  return (
    <StyledAddProduct>
      <div className="inner-modal">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Add Product</h1>

          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="name"
            placeholder="*name"
            required
            defaultValue={addProductModal === "new" ? "" : selectedProduct.name}
          />
          <input
            onChange={(e) => handleChange(e)}
            type="number"
            name="price"
            placeholder="*price"
            defaultValue={
              addProductModal === "new" ? "" : selectedProduct.price
            }
            required
          />
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="discount"
            placeholder="*has discount?"
            defaultValue={
              addProductModal === "new" ? "" : selectedProduct.discount
            }
            required
          />
          <input
            onChange={(e) => handleChange(e)}
            type="number"
            name="price_after_discount"
            placeholder="price_after_discount"
            defaultValue={
              addProductModal === "new"
                ? ""
                : selectedProduct.price_after_discount || ""
            }
          />
          <textarea
            onChange={(e) => handleChange(e)}
            name="description"
            placeholder="description"
            defaultValue={
              addProductModal === "new" ? "" : selectedProduct.description
            }
          ></textarea>
          <textarea
            onChange={(e) => handleChange(e)}
            name="product_care"
            placeholder="product_care"
            defaultValue={
              addProductModal === "new" ? "" : selectedProduct.product_care
            }
          ></textarea>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="material"
            placeholder="material"
            defaultValue={
              addProductModal === "new" ? "" : selectedProduct.material
            }
          />
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="colour"
            placeholder="colour"
            defaultValue={
              addProductModal === "new" ? "" : selectedProduct.colour
            }
          />
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="cover_photo"
            placeholder="cover_photo"
            defaultValue={
              addProductModal === "new" ? "" : selectedProduct.cover_photo
            }
          />
          <textarea
            onChange={(e) => handleChange(e)}
            name="gallery"
            placeholder="gallery"
            defaultValue={
              addProductModal === "new" ? "" : selectedProduct.gallery
            }
          ></textarea>
          <input
            onChange={(e) => handleChange(e)}
            type="number"
            name="quantity"
            placeholder="quantity"
            defaultValue={
              addProductModal === "new" ? "" : selectedProduct.quantity
            }
          />
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="category"
            placeholder="category"
            defaultValue={
              addProductModal === "new" ? "" : selectedProduct.category
            }
          />
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="product_style"
            placeholder="product style"
            defaultValue={
              addProductModal === "new" ? "" : selectedProduct.product_style
            }
          />
          <div className="submit-section">
            <button
              type="button"
              onClick={() => {
                setAddProductModal(null);
              }}
            >
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </StyledAddProduct>
  );
};

export default AddProduct;
