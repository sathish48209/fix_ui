import FilterTab from "../filterTab/FilterTab";
import FiltersColumn from "../filters/FilterFirstColumn";
import React, { useState, useEffect } from "react";
import "./FilterContainer.scss";
import FilterPopup from "../container/filter-popup/FilterPopup";

interface FilterContainerProps {
  authoredFilters: string[];
  filterTheme: string;
  initialData: any[];
  setFilteredData: (newFilteredData: any[]) => void;
  setFilteredRows: (filteredData: any[]) => void;
  autoFiltersPopulation: boolean;
}

const FilterContainer: React.FC<FilterContainerProps> = (props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterDataUpdated, setIsFilterDataUpdated] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [resultFilteredData, setResultFilteredData] = useState<any[]>([]);
  const [isPopupOpen, setIspopupOpen] = useState(false);

  useEffect(() => {
    updateFilteredData();
  }, [selectedFilters]);

  const toggleFilters = () => {
    setIsFilterDataUpdated(false);
    setIsListOpen(!isListOpen);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(value)
        ? prevFilters.filter((item) => item !== value)
        : [...prevFilters, value]
    );

    if (selectedFilters.length === 0) {
      setIsFilterDataUpdated(false);
    }
  };

  const updateFilteredData = () => {
    setIsFilterDataUpdated(true);

    const newFilteredData = props.initialData.filter((item) =>
      selectedFilters.includes(item.accountGroup)
    );

    setFilteredData(newFilteredData);
    setResultFilteredData(newFilteredData);
    setIsFilterDataUpdated(selectedFilters.length > 0);
    props.setFilteredRows(newFilteredData);
  };

  const resetFilters = () => {
    setSelectedFilters([]);
    props.setFilteredRows(props.initialData);
    setFilteredData(props.initialData);
    props.setFilteredData(props.initialData);
  };

  const handleClosePopup = () => {
    setIspopupOpen(false);
  };

  const handleOpenPopup = () => {
    setIspopupOpen(true);
  };

  return (
    <div className="performance-filters-container">
      <div className="filters-wrapper">
        <div className="dropdown-wrapper">
          <span className="filter-label">Filter</span>
          <div className="tab-headers-section">
            <FilterTab toggleState={isListOpen} onClick={toggleFilters} />
            <FilterTab toggleState={isListOpen} onClick={toggleFilters} />
          </div>
          <div className="reset-filter-label">
            <span>I</span>
            <span onClick={resetFilters}>Reset Filters</span>
          </div>
          <div className="filter-icon-container">
            <div>Items Count</div>
            <div className="filter-icon" onClick={handleOpenPopup}>
              <span>F</span>
            </div>
          </div>
        </div>

        {/* POPUP SECTION START */}
        {isPopupOpen && (
          <FilterPopup
            filterData={props.authoredFilters}
            handleClosePopup={handleClosePopup}
          />
        )}
        {/* POPUP SECTION END */}

        <div
          className="selection-container"
          style={isListOpen ? { display: "" } : { display: "none" }}
        >
          <FiltersColumn
            filterData={props.authoredFilters}
            selectedFilters={selectedFilters}
            containerState={handleFilterChange}
            autoFiltersPopulation={props.autoFiltersPopulation}
            initialData={props.initialData}
            filterTheme={props.filterTheme}
            isFilterUpdated={isFilterDataUpdated}
            toggleFilters={toggleFilters}
            resultFilteredData={resultFilteredData}
            setFilteredData={props.setFilteredData}
            updateFilteredData={updateFilteredData}
          />
        </div>
        <div className="filtered-items-count">
          <b>{resultFilteredData.length} items</b> All Series | All Topics | All
          Asset class | All Format
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
