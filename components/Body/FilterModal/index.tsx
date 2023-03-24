import { Montserrat } from "@next/font/google";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import {
  filterSetUp,
  getFilterNumber,
  handleCheckboxChange,
  handleClear,
} from "../../../lib/functions";
import {
  DocumentObject,
  FilterSelected,
  SetStateBoolean,
  SetStateDocumentObject,
  SetStateNumber,
  StateBoolean,
} from "../../../lib/types";
import { StyledFilterModal } from "./styles";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const FilterModal = ({
  filterModal,
  setFilterModal,
  setFilterNumber,
  filterNumber,
  products,
  setAfterFilterProducts,
  afterFilterProducts,
}: {
  filterModal: StateBoolean;
  setFilterModal: SetStateBoolean;
  setFilterNumber: SetStateNumber;
  filterNumber: number;
  products: DocumentObject;
  setAfterFilterProducts: SetStateDocumentObject;
  afterFilterProducts: DocumentObject;
}) => {
  const [material, setMaterial] = useState<string[]>([]);
  const [colour, setColour] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<FilterSelected>({
    material: [],
    colour: [],
  });

  const [showFilter, setShowFilter] = useState({
    materialFilter: false,
    colourFilter: false,
  });
  useEffect(() => {
    filterSetUp(products, setMaterial, setColour, setAfterFilterProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const filterMaterialProduct = products
      .filter((product) => {
        if (selectedValues.material.length === 0) {
          return true;
        }
        return selectedValues.material.some((el) =>
          product.material.includes(el)
        );
      })
      .filter((product) => {
        if (selectedValues.colour.length === 0) {
          return true;
        }
        return selectedValues.colour.some((el) => product.colour.includes(el));
      });

    setAfterFilterProducts([...filterMaterialProduct]);
    setFilterNumber(getFilterNumber(selectedValues));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValues]);

  const availableColour = new Set(
    products
      .filter((product) => {
        if (selectedValues.material.length === 0) {
          return true;
        }
        return selectedValues.material.some((el) =>
          product.material.includes(el)
        );
      })
      .map((product) => product.colour)
      .flat()
  );
  const availableMaterials = new Set(
    products
      .filter((product) => {
        if (selectedValues.colour.length === 0) {
          return true;
        }
        return selectedValues.colour.some((el) => product.colour.includes(el));
      })
      .map((product) => product.material)
      .flat()
  );
  const mappedMaterial = material.map((el, i) => {
    return (
      <div className="property" id="material" key={i}>
        <input
          name={el}
          className={!availableMaterials.has(el) ? "disable" : ""}
          id={el}
          type="checkbox"
          value={el}
          disabled={!availableMaterials.has(el)}
          onChange={(e) => {
            handleCheckboxChange(e, selectedValues, setSelectedValues);
          }}
        />
        {/** custom checkbox  */}
        <span
          className={
            !availableMaterials.has(el) ? "checkmark disable" : "checkmark"
          }
        ></span>
        <label
          className={!availableMaterials.has(el) ? " disable" : ""}
          htmlFor={el}
        >
          {el}
        </label>
      </div>
    );
  });
  const mappedColour = colour.map((el, i) => {
    return (
      <div className="property" id="colour" key={i}>
        <input
          name={el}
          id={el}
          type="checkbox"
          value={el}
          disabled={!availableColour.has(el)}
          onChange={(e) => {
            handleCheckboxChange(e, selectedValues, setSelectedValues);
          }}
        />
        {/** custom checkbox  */}
        <span
          className={
            !availableColour.has(el) ? "checkmark disable" : "checkmark"
          }
        ></span>
        <label
          htmlFor={el}
          className={!availableColour.has(el) ? "disable" : ""}
        >
          {el}
        </label>
      </div>
    );
  });
  return (
    <StyledFilterModal>
      <div className={filterModal ? "outer-modal open" : "outer-modal"}>
        <div className={filterModal ? "inner-modal open" : "inner-modal"}>
          <div className="main-header">
            <h2>SHOW FILTER</h2>
            {filterNumber > 0 && (
              <p className="filter-count">({filterNumber})</p>
            )}
            {filterNumber > 0 && (
              <button
                className={`${montserrat.className} clear-button`}
                onClick={() => {
                  handleClear();
                  setSelectedValues({ material: [], colour: [] });
                }}
              >
                Clear
              </button>
            )}
            <button onClick={() => setFilterModal(false)}>&#9587;</button>
          </div>
          <div className="body-container">
            <div className="body">
              <div className="filter-section">
                <div
                  className="header"
                  onClick={() =>
                    setShowFilter({
                      ...showFilter,
                      materialFilter: !showFilter.materialFilter,
                    })
                  }
                >
                  <h2>Material</h2>
                  <h2
                    className={
                      showFilter.materialFilter ? "triangle open" : "triangle"
                    }
                  >
                    &#9650;
                  </h2>
                </div>
                <div
                  className={
                    showFilter.materialFilter
                      ? "property-container open"
                      : "property-container"
                  }
                >
                  <div className="filter-slide">{mappedMaterial}</div>
                </div>
              </div>
              <div className="filter-section">
                <div
                  className="header"
                  onClick={() =>
                    setShowFilter({
                      ...showFilter,
                      colourFilter: !showFilter.colourFilter,
                    })
                  }
                >
                  <h2>Colour</h2>
                  <h2
                    className={
                      showFilter.colourFilter ? "triangle open" : "triangle"
                    }
                  >
                    &#9650;
                  </h2>
                </div>
                <div
                  className={
                    showFilter.colourFilter
                      ? "property-container open"
                      : "property-container"
                  }
                >
                  <div className="filter-slide">{mappedColour}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="button-section">
            <button
              onClick={() => setFilterModal(false)}
              className="submit-result"
            >
              Show {afterFilterProducts.length} Products
            </button>
          </div>
        </div>
      </div>
    </StyledFilterModal>
  );
};

export default FilterModal;
