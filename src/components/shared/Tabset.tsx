import React, { useState } from "react";
import { DataModel, FilterModel } from "../../types/Filters";
import Tab from "./Tab";
import "../styles/Tabset.scss";
import FilterPopup from "../filter-popup/FilterPopup";

const Tabset: React.FC<{
  filterDetails: FilterModel[];
  filtersApplied: Record<string, string[]>;
  setFiltersApplied: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  handleViewResults: () => void;
  handleResetFilters: () => void;
  itemsCount: number;
}> = ({
  filterDetails,
  filtersApplied,
  setFiltersApplied,
  handleViewResults,
  handleResetFilters,
  itemsCount,
}) => {
  const [currentFilterTab, setCurrentFilterTab] = useState<FilterModel>();
  const [isPopupOpen, setIspopupOpen] = useState(false);

  const handleTabChange = (tabName: string) => {
    const matchedFilterModel = filterDetails.find(
      (model) => model.aggregateTableKey === tabName
    );
    if (matchedFilterModel) {
      if (
        matchedFilterModel.aggregateTableKey ===
        currentFilterTab?.aggregateTableKey
      ) {
        setCurrentFilterTab(undefined);
      } else {
        setCurrentFilterTab(matchedFilterModel);
      }
    }
  };

  const handleCheckboxToggle = (filterKey: string, checked: boolean) => {
    if (currentFilterTab) {
      let updatedFiltersApplied = {
        ...filtersApplied,
      };

      if (checked) {
        if (!(currentFilterTab.aggregateTableKey in updatedFiltersApplied)) {
          updatedFiltersApplied = {
            ...updatedFiltersApplied,
            [currentFilterTab.aggregateTableKey]: [filterKey],
          };
        } else {
          updatedFiltersApplied = {
            ...updatedFiltersApplied,
            [currentFilterTab.aggregateTableKey]: [
              ...updatedFiltersApplied[currentFilterTab.aggregateTableKey],
              filterKey,
            ],
          };
        }
      } else {
        const updatedFilters = updatedFiltersApplied[
          currentFilterTab.aggregateTableKey
        ].filter((filter) => filter !== filterKey);

        if (updatedFilters.length === 0) {
          delete updatedFiltersApplied[currentFilterTab.aggregateTableKey];
        } else {
          updatedFiltersApplied = {
            ...updatedFiltersApplied,
            [currentFilterTab.aggregateTableKey]: updatedFiltersApplied[
              currentFilterTab.aggregateTableKey
            ].filter((filter) => filter !== filterKey),
          };
        }
      }

      setFiltersApplied(updatedFiltersApplied);
    }
  };

  const handleClosePopup = () => {
    setIspopupOpen(false);
  };

  const handleOpenPopup = () => {
    setIspopupOpen(true);
  };

  return (
    <>
      {!isPopupOpen && (
        <div className="filters-container">
          <div className="filter-label">Filter</div>
          <div className="tabs-container">
            {filterDetails.map((filter, idx) => {
              return (
                <Tab
                  tabDetails={filter}
                  expanded={
                    filter.aggregateTableTitle ===
                    currentFilterTab?.aggregateTableTitle
                  }
                  handleTabChange={handleTabChange}
                  key={filter.aggregateTableKey}
                />
              );
            })}
          </div>
          <div className="reset-filter" onClick={handleResetFilters}>
            <span>I</span>
            <span>Reset Filters</span>
          </div>

          <div className="items-count">
            <span>
              <strong>{itemsCount}</strong> Items
            </span>
            <div className="filter-icon" onClick={handleOpenPopup}>
              <span>F</span>
            </div>
          </div>
        </div>
      )}

      {/* POPUP SECTION START */}
      {isPopupOpen && (
        <FilterPopup
          filterDetails={filterDetails}
          filtersApplied={filtersApplied}
          handleClosePopup={handleClosePopup}
          handleViewResults={handleViewResults}
          handleResetFilters={handleResetFilters}
          itemsCount={itemsCount}
          handleCheckboxToggle={handleCheckboxToggle}
          currentFilterTab={currentFilterTab as FilterModel}
          handleTabChange={handleTabChange}
        />
      )}
      {/* POPUP SECTION END */}

      {currentFilterTab && (
        <div className="tab-panel">
          <div className="view-options-container">
            {currentFilterTab?.filters?.length &&
              currentFilterTab.filters.map((filter) => (
                <div className="view-option" key={filter}>
                  <input
                    type="checkbox"
                    id={filter}
                    checked={
                      filtersApplied?.[
                        currentFilterTab.aggregateTableKey
                      ]?.includes(filter) ?? false
                    }
                    onChange={(e) =>
                      handleCheckboxToggle(filter, e.target.checked)
                    }
                  />
                  <label className="label" htmlFor={filter}>
                    {filter}
                  </label>
                </div>
              ))}
          </div>
          <div
            className="btn"
            onClick={() => {
              setCurrentFilterTab(undefined);
              handleViewResults();
            }}
          >
            View Results
          </div>
        </div>
      )}
    </>
  );
};

export default Tabset;
