import React from "react";
import "./Filter.scss";

interface FiltersColumnProps {
  autoFiltersPopulation: boolean;
  initialData: any[];
  filterData: any[];
  resultFilteredData: any[];
  selectedFilters: string[];
  filterTheme: string;
  isFilterUpdated: boolean;
  toggleFilters: () => void;
  setFilteredData: (newFilteredData: any[]) => void;
  updateFilteredData: () => void;
  containerState: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FiltersColumn: React.FC<FiltersColumnProps> = ({
  autoFiltersPopulation,
  initialData,
  filterData,
  selectedFilters,
  filterTheme,
  setFilteredData,
  resultFilteredData,
  isFilterUpdated,
  toggleFilters,
  updateFilteredData,
  containerState,
}) => {
  const filters: string[] = autoFiltersPopulation
    ? Array.from(new Set(initialData.map((item) => item.accountGroup)))
    : filterData;

  console.log(filters, "FILTERsRowsColumns");

  return (
    <>
      <div className="filterContainer">
        <ul className="select-list-container">
          {filters.map((item, i) => (
            <li className="mam-checkbox-label" key={i}>
              <input
                className={`mam-checkbox ${filterTheme}`}
                type="checkbox"
                name={item}
                onClick={(e: any) => containerState(e)}
                value={item}
                checked={selectedFilters.includes(item)}
                id={`option-${i}-${item}`}
              />
              <label htmlFor={`option-${i}-${item}`}>{item}</label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button
          className={`mam-button ${isFilterUpdated && filterTheme}`}
          onClick={() => {
            toggleFilters();
            updateFilteredData();
            setFilteredData(resultFilteredData);
          }}
          disabled={selectedFilters.length == 0}
        >
          View Results
        </button>
      </div>
    </>
  );
};

export default FiltersColumn;
