import { ChangeEvent, FormEvent } from "react";
import {
  CartItem,
  DocumentObject,
  FilterSelected,
  Product,
  SetBag,
  SetStateDocumentObject,
  SetStateNumber,
  SetStateStringArray,
  SetUserDataType,
  SingleObject,
  UserDataType,
} from "./types";
/** get the options from products, however the filter section is fixed */
export function filterSetUp(
  products: DocumentObject,
  setMaterial: SetStateStringArray,
  setColour: SetStateStringArray,
  setAfterFilterProducts: SetStateDocumentObject
) {
  const materialArr: string[] = [];
  for (const product of products) {
    for (const el of product["material"]) {
      if (materialArr.includes(el)) {
        continue;
      } else {
        materialArr.push(el);
      }
    }
  }
  setMaterial(materialArr);

  const colourArr: string[] = [];
  for (const product of products) {
    for (const el of product["colour"]) {
      if (colourArr.includes(el)) {
        continue;
      } else {
        colourArr.push(el);
      }
    }
  }
  setColour(colourArr);

  setAfterFilterProducts(products);
  return;
}

export function handleCheckboxChange(
  e: { currentTarget: any },
  selectedValues: FilterSelected,
  setSelectedValues: React.Dispatch<React.SetStateAction<FilterSelected>>
) {
  const { name, checked } = e.currentTarget;
  const filterType: string = e.currentTarget.parentElement.id;
  if (checked) {
    setSelectedValues({
      ...selectedValues,
      [filterType]: [...selectedValues[filterType], name],
    });
  } else {
    setSelectedValues({
      ...selectedValues,
      [filterType]: [
        ...selectedValues[filterType].filter((el: string) => el !== name),
      ],
    });
  }
}
export function getFilterNumber(selectedValues: FilterSelected) {
  let number = 0;
  for (const el in selectedValues) {
    number += selectedValues[el].length;
  }
  return number;
}
export function handleClear() {
  const checkboxes = document.querySelectorAll(
    "input[type='checkbox']"
  ) as NodeListOf<HTMLInputElement>;

  checkboxes.forEach(
    (checkbox: HTMLInputElement) =>
      checkbox.checked && (checkbox.checked = false)
  );
}

export function sortProducts(products: DocumentObject, sortMethod: string) {
  if (sortMethod === "Recommandation") {
    products.sort(
      (a: SingleObject, b: SingleObject) => (a.id as number) - (b.id as number)
    );
  } else if (sortMethod === "Price (High to Low)") {
    products.sort(
      (a: SingleObject, b: SingleObject) =>
        (b.price as number) - (a.price as number)
    );
  } else if (sortMethod === "Price (Low to High)") {
    products.sort(
      (a: SingleObject, b: SingleObject) =>
        (a.price as number) - (b.price as number)
    );
  } else if (sortMethod === "Product Name") {
    products.sort((a: SingleObject, b: SingleObject) => {
      const nameA = (a.name as string).toLocaleLowerCase();
      const nameB = (b.name as string).toLocaleLowerCase();
      return nameA.localeCompare(nameB);
    });
  }

  return products;
}
/**
 * Take User ID to fetch Shopping Bag
 * @param id
 * @returns CartItem[]
 */
export async function getUserBag(id: string) {
  const res = await fetch("/api/getUserBag/", {
    method: "POST",
    body: JSON.stringify({ user_id: id }),
  });
  const result = await res.json();
  return result.data;
}

/**Updating a list of products of Bag table
 * @param {CartItem[]} newItem
 */
export async function addToUserBag(newItem: CartItem[]) {
  const res = await fetch("/api/addToUserBag", {
    method: "POST",
    body: JSON.stringify({
      newItem,
    }),
  });
  return await res.json();
}
/**fetch function to get product details
 * @param shoppingBag take in CartItem[]
 * return Array<Product[]>
 */
export async function getBagProductData(shoppingBag: CartItem[]) {
  const itemsID = shoppingBag.map((el: CartItem) => el.product_id);

  const res = await fetch("/api/getBagProduct/", {
    method: "POST",
    body: JSON.stringify({ product_id: itemsID }),
  });
  const result = await res.json();
  return result.data;
}

export function getTotalAmount(bagItem: Product[], bag: CartItem[]) {
  if (bagItem.length > 0) {
    return (
      bagItem.reduce((accu: number, curr: Product) => {
        return (
          accu +
          curr.price *
            bag.filter((el: CartItem) => el.product_id === curr.id)[0]?.quantity
        );
      }, 0) / 100
    );
  }
  return 0;
}
/**Set Up User Shopping Bag and length in Header*/
export function setUserShoppingBag(
  userData: UserDataType,
  setBagLength: SetStateNumber,
  setBag: SetBag,
  setBagItems: (productData: Product[]) => void
) {
  const result = getUserBag(userData.id as string);
  result.then((items) => {
    setBagLength(
      items.reduce((accu: number, item: CartItem) => {
        return accu + item.quantity;
      }, 0)
    );
    setBag(items);
    const bagProductData = getBagProductData(items);
    bagProductData.then((res) => setBagItems(res));
  });
}
/**
 * This onClick function updates the DB with upsert function and fetch back the new version and update the Shopping Bag and also when the shopping bag is updated, the length is updated as well.
 * @param userData Use the userData.id to add product
 * @param shoppingBag The variable that shows in the shopping bag component
 * @param data Product data of the current page
 * @param setShoppingBag SetState of Shopping Bag
 */
export async function handleAddProduct(
  userData: UserDataType,
  shoppingBag: CartItem[],
  data: Product,
  setShoppingBag: SetBag,
  productData: Product[],
  setProductData: (productData: Product[]) => void
) {
  if (userData.id !== "") {
    const productInBag = shoppingBag.filter(
      (productInBag) => productInBag.product_id === data.id
    );

    const newItem: CartItem[] = productInBag.length
      ? [
          {
            id: productInBag[0].id,
            user_id: userData.id,
            product_id: data.id,
            quantity: productInBag[0].quantity + 1,
          },
        ]
      : [
          {
            user_id: userData.id,
            product_id: data.id,
            quantity: 1,
          },
        ];
    const message = await addToUserBag(newItem);
    if (message) {
      const newBag = await getUserBag(userData.id);
      setShoppingBag(newBag);
    }
  } else {
    const currentBag = JSON.parse(localStorage.getItem("bag") as string) || {};

    localStorage.setItem(
      "bag",
      JSON.stringify({
        ...currentBag,
        [data.id]: currentBag[data.id] + 1 || 1,
      })
    );

    const newBag = JSON.parse(localStorage.getItem("bag") as string) || {};
    const updateBag = [];
    for (const item in newBag) {
      updateBag.push({
        user_id: "",
        product_id: parseInt(item),
        quantity: parseInt(newBag[item]),
      });
    }
    setShoppingBag(updateBag);
  }

  if (productData.filter((el) => el.id === data.id).length === 0) {
    setProductData([...productData, data]);
  }
}
export async function handleDeleteProduct(
  userData: UserDataType,
  shoppingBag: CartItem[],
  data: Product,
  setShoppingBag: SetBag,
  productData: Product[],
  setProductData: (productData: Product[]) => void
) {
  if (userData.id !== "") {
    const productInBag = shoppingBag.filter(
      (productInBag) => productInBag.product_id === data.id
    );

    const newItem: CartItem[] = productInBag.length
      ? [
          {
            id: productInBag[0].id,
            user_id: userData.id,
            product_id: data.id,
            quantity: productInBag[0].quantity - 1,
          },
        ]
      : [
          {
            user_id: userData.id,
            product_id: data.id,
            quantity: 1,
          },
        ];
    const message = await addToUserBag(newItem);
    if (message) {
      const newBag = await getUserBag(userData.id);
      setShoppingBag(newBag);
    }
  } else {
    const currentBag = JSON.parse(localStorage.getItem("bag") as string) || {};

    localStorage.setItem(
      "bag",
      JSON.stringify({
        ...currentBag,
        [data.id]: currentBag[data.id] + 1 || 1,
      })
    );

    const newBag = JSON.parse(localStorage.getItem("bag") as string) || {};
    const updateBag = [];
    for (const item in newBag) {
      updateBag.push({
        user_id: "",
        product_id: parseInt(item),
        quantity: parseInt(newBag[item]),
      });
    }
    setShoppingBag(updateBag);
  }

  if (productData.filter((el) => el.id === data.id).length === 0) {
    setProductData([...productData, data]);
  }
}

export async function handleQuantityChange(
  change: string,
  clickeditem: CartItem,
  shoppingBag: CartItem[],
  userData: UserDataType,
  setShoppingBag: SetBag
) {
  if (userData.id !== "") {
    let newShoppingBag = shoppingBag.map((item: CartItem) => {
      if (item.product_id === clickeditem.product_id) {
        if (change === "more") {
          return { ...item, quantity: item.quantity + 1 };
        } else if (change === "less") {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    const message = await addToUserBag(newShoppingBag);
    if (message) {
      const newBag = await getUserBag(userData.id);
      setShoppingBag(newBag);
    }
  } else {
  }
}

export function handleUserInfoChange(
  e: ChangeEvent<HTMLInputElement>,
  setUserInfo: SetUserDataType,
  userInfo: UserDataType
) {
  const { name, value, type, checked } = e.target;
  setUserInfo({
    ...userInfo,
    [name]: type === "checkbox" ? checked : value,
  });
}

export async function handleUpdateUser(
  e: FormEvent<HTMLFormElement>,
  userInfo: UserDataType,
  setLoading: (prev: boolean) => void
) {
  e.preventDefault();
  setLoading(true);
  const res = await fetch("/api/updateUserInfo", {
    method: "POST",
    body: JSON.stringify(userInfo),
  });
  const data = await res.json();
  console.log(data);
  if (data) {
    alert("User Information has been updated!");
    setLoading(false);
  }
}
export async function getOrder(userID: string) {
  const res = await fetch("/api/getOrder", {
    method: "POST",
    body: JSON.stringify(userID),
  });
  const result = await res.json();
  return result;
}
