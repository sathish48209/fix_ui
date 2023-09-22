import React, { useEffect, useState } from "react";
import "./FilterPopup.scss";

const FilterPopup: React.FC<{
  filterData: string[];
  handleClosePopup: () => void;
}> = ({ filterData, handleClosePopup }) => {
  const names = ["Event", "Document", "Financial Year"];

  const getInitialAccordionState = () => {
    const state: Record<string, boolean> = {};
    names.forEach((name) => {
      state[name] = false;
    });
    return state;
  };
  const [accordionState, setAccordionState] = useState<Record<string, boolean>>(
    getInitialAccordionState()
  );

  const handleAccordionToggle = (name: string) => {
    setAccordionState({
      ...accordionState,
      [name]: !accordionState[name],
    });
  };

  useEffect(() => {
    console.log(accordionState);
  }, [accordionState]);

  return (
    <div className="container">
      <div className="toolbar">
        <div>Filter</div>
        <div className="details">
          <div>
            <strong>479 </strong>
            items
          </div>
          <div className="close-icon" onClick={handleClosePopup}>
            <span>C</span>
          </div>
        </div>
      </div>

      <div className="accordion-section">
        {names.map((name) => (
          <div className="accordion">
            <div
              className="accordion-header"
              onClick={() => handleAccordionToggle(name)}
            >
              <div className="name">{name}</div>
              <div className="icon">T</div>
            </div>
            <div
              className={`accordion-body ${accordionState[name] ? "open" : ""}`}
            >
              <div>
                {filterData.map((filter) => {
                  return (
                    <div key={filter} className="filter-checkbox">
                      <input type="checkbox" />
                      <div>{filter}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="popup-actions">
        <div className="btn">View Results</div>
        <div>Reset Filters</div>
      </div>
    </div>
  );
};

export default FilterPopup;
