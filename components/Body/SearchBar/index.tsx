import React, { useEffect, useState } from "react";
import {
  DocumentObject,
  SetStateBoolean,
  SetStateString,
} from "../../../lib/types";
import { StyledSearchBar } from "./styles";
import { Manrope } from "@next/font/google";
import Image from "next/image";
const SearchBar = ({
  products,
  filterNumber,
  setFilterModal,
  setSortMethod,
  sortMethod,
}: {
  products: DocumentObject;
  setFilterModal: SetStateBoolean;
  filterNumber: number;
  setSortMethod: SetStateString;
  sortMethod: string;
}) => {
  return (
    <StyledSearchBar>
      <button className="filter" onClick={() => setFilterModal(true)}>
        <span>Filter</span>
        {filterNumber > 0 && <p>({filterNumber})</p>}
        <Image src="/filter.png" alt="filter" height={18} width={18} />
      </button>

      <div className="right-side">
        <p className="sort-by">Sort by:</p>
        <div className="select">
          <select
            onChange={(e) => setSortMethod(e.target.value)}
            className="sort-selection"
          >
            <option value="Recommandation" className="sort-choice">
              Recommandation
            </option>
            <option value="Price (High to Low)" className="sort-choice">
              Price (High to Low)
            </option>
            <option value="Price (Low to High)" className="sort-choice">
              Price (Low to High)
            </option>
            <option value="Product Name" className="sort-choice">
              Product Name
            </option>
          </select>
        </div>
      </div>
    </StyledSearchBar>
  );
};

export default SearchBar;
