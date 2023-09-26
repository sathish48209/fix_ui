import React, { useEffect, useState } from "react";
import "./FilterPopup.scss";
import { FilterDetails, FilterModel } from "../../types/Filters";

const FilterPopup: React.FC<{
  filterDetails: FilterDetails;
  handleClosePopup: () => void;
  handleViewResults: () => void;
  handleResetFilters: () => void;
  itemsCount: number;
  filtersApplied: Record<string, string[]>;
  handleCheckboxToggle: (arg1: string, arg2: boolean) => void;
  currentFilterTab: FilterModel;
  handleTabChange: (arg: string) => void;
}> = ({
  filterDetails,
  handleClosePopup,
  handleViewResults,
  handleResetFilters,
  itemsCount,
  filtersApplied,
  handleCheckboxToggle,
  currentFilterTab,
  handleTabChange,
}) => {
  const [accordionState, setAccordionState] =
    useState<Record<string, boolean>>();

  // const handleAccordionToggle = (name: string) => {
  //   setAccordionState({
  //     ...accordionState,
  //     [name]: !accordionState[name],
  //   });
  // };

  useEffect(() => {
    console.log(accordionState);
  }, [accordionState]);

  return (
    <div className="container">
      <div className="toolbar">
        <div>Filter</div>
        <div className="details">
          <div>
            <strong>{itemsCount} </strong>
            items
          </div>
          <div className="close-icon" onClick={handleClosePopup}>
            <span>C</span>
          </div>
        </div>
      </div>

      <div className="accordion-section">
        {filterDetails.filterModel.map((filterModel) => (
          <div className="accordion" key={filterModel.aggregateTableKey}>
            <div
              className="accordion-header"
              onClick={() => {
                handleTabChange(filterModel.aggregateTableKey);
              }}
            >
              <div className="name">{filterModel.aggregateTableTitle}</div>
              <div className="icon">T</div>
            </div>
            <div
              className={`accordion-body ${
                currentFilterTab?.aggregateTableKey ===
                filterModel.aggregateTableKey
                  ? "open"
                  : ""
              }`}
            >
              <div>
                {filterModel.filters.map((filter) => {
                  return (
                    <div key={filter} className="filter-checkbox">
                      <input
                        type="checkbox"
                        id={filter}
                        checked={
                          filtersApplied?.[
                            currentFilterTab?.aggregateTableKey
                          ]?.includes(filter) ?? false
                        }
                        onChange={(e) =>
                          handleCheckboxToggle(filter, e.target.checked)
                        }
                      />
                      <label htmlFor={filter}>{filter}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="popup-actions">
        <div
          className="btn"
          onClick={() => {
            handleViewResults();
            handleClosePopup();
          }}
        >
          View Results
        </div>
        <div
          onClick={() => {
            handleResetFilters();
            handleClosePopup();
          }}
        >
          Reset Filters
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
