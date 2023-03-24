import {
  CartItem,
  DocumentObject,
  FilterSelected,
  Product,
  SetBag,
  SetBagItem,
  SetStateDocumentObject,
  SetStateNumber,
  SetStateStringArray,
  SingleObject,
  UserData,
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

/**Adding a list of new products to Cart table
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

export async function getBagProductData(id: number[]) {
  const res = await fetch("/api/getBagProduct/", {
    method: "POST",
    body: JSON.stringify({ product_id: id }),
  });
  const result = await res.json();
  return result.data;
}

export function getTotalAmount(bagItem: Product[], bag: CartItem[]) {
  return (
    bagItem.reduce((accu: number, curr: Product) => {
      return (
        accu +
        curr.price *
          bag.filter((el: CartItem) => el.product_id === curr.id)[0].quantity
      );
    }, 0) / 100
  );
}
/**Set Up User Shopping Bag and length in Header*/
export function setUserShoppingBag(
  userData: UserData,
  setBagLength: SetStateNumber,
  setBag: SetBag,
  setBagItems: SetBagItem
) {
  const result = getUserBag(userData.id as string);
  result.then((items) => {
    setBagLength(
      items.reduce((accu: number, item: CartItem) => {
        return accu + item.quantity;
      }, 0)
    );
    setBag(items);
    const itemsID = items.map((el: CartItem) => el.product_id);
    const bagProductData = getBagProductData(itemsID);
    bagProductData.then((res) => setBagItems(res));
  });
}
