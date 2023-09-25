import React from "react";
import { FilterModel } from "../../types/Filters";

const Tab: React.FC<{
  tabDetails: FilterModel;
  expanded: boolean;
  handleTabChange: (arg: string) => void;
}> = ({ tabDetails, expanded, handleTabChange }) => {
  return (
    <div
      className={`tab-container ${expanded ? "expanded" : ""}`}
      onClick={() => handleTabChange(tabDetails.aggregateTableTitle)}
    >
      <span className="tab-label">{tabDetails.aggregateTableTitle}</span>
      <span>I</span>
    </div>
  );
};

export default Tab;
