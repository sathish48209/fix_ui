import React, { useState } from "react";
import { FilterDetails, FilterModel } from "../../types/Filters";
import Tab from "./Tab";
import "../styles/Tabset.scss";

const Tabset: React.FC<{
  filterDetails: FilterDetails;
  filtersApplied: Record<string, string[]>;
  setFiltersApplied: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  handleViewResults: () => void;
  handleResetFilters: () => void;
}> = ({
  filterDetails,
  filtersApplied,
  setFiltersApplied,
  handleViewResults,
  handleResetFilters,
}) => {
  const [currentFilterTab, setCurrentFilterTab] = useState<FilterModel>();

  const handleTabChange = (tabName: string) => {
    const matchedFilterModel = filterDetails.filterModel.find(
      (model) => model.aggregateTableTitle === tabName
    );
    if (matchedFilterModel) {
      if (
        matchedFilterModel.aggregateTableTitle ===
        currentFilterTab?.aggregateTableTitle
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
        updatedFiltersApplied = {
          ...updatedFiltersApplied,
          [currentFilterTab.aggregateTableKey]: updatedFiltersApplied[
            currentFilterTab.aggregateTableKey
          ].filter((filter) => filter !== filterKey),
        };
      }

      setFiltersApplied(updatedFiltersApplied);
    }
  };

  return (
    <>
      <div className="filters-container">
        <div className="filter-label">Filter</div>
        <div className="tabs-container">
          {filterDetails.filterModel.map((filter, idx) => {
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
      </div>

      {currentFilterTab && (
        <div className="tab-panel">
          {currentFilterTab.filters.map((filter) => (
            <div className="view-option" key={filter}>
              <input
                type="checkbox"
                id={filter}
                checked={
                  filtersApplied?.[
                    currentFilterTab.aggregateTableKey
                  ]?.includes(filter) ?? false
                }
                onChange={(e) => handleCheckboxToggle(filter, e.target.checked)}
              />
              <label className="label" htmlFor={filter}>
                {filter}
              </label>
            </div>
          ))}
          <div className="btn" onClick={handleViewResults}>
            View Results
          </div>
        </div>
      )}
    </>
  );
};

export default Tabset;
