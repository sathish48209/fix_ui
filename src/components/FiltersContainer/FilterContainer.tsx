import FilterTab from "../filterTab/FilterTab";
import FiltersColumn from "../filters/FilterFirstColumn";
import React, { useState, useEffect } from "react";
import "./FilterContainer.scss";

interface FilterContainerProps {
  authoredFilters: string[];
  filterTheme: string;
  initialData: any[];
  newSetFilteredData: (newFilteredData: any[]) => void;
  setFilteredRows: (filteredData: any[]) => void;
  autoFiltersPopulation: boolean;
}

const FilterContainer: React.FC<FilterContainerProps> = (props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterDataUpdated, setIsFilterDataUpdated] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [resultFilteredData, setResultFilteredData] = useState<any[]>([]);

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
    props.newSetFilteredData(props.initialData);
  };

  return (
    <div className="performance-filters-container">
      <div className="filters-wrapper">
        <div className="dropdown-wrapper expanded-border">
          <FilterTab toggleState={isListOpen} onClick={toggleFilters} />
          <span className="filter-label" onClick={resetFilters}>
            Reset Filters
          </span>
        </div>
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
            newSetFilteredData={props.newSetFilteredData}
            updateFilteredData={updateFilteredData}
          />
        </div>
      </div>
      <div className="selected-filters-container px18">
        <b>{resultFilteredData.length} items</b> All Series | All Topics | All
        Asset class | All Format
      </div>
    </div>
  );
};

export default FilterContainer;
