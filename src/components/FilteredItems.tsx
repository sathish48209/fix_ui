import React, { useEffect } from "react";
import { DataModel } from "../types/Filters";

const FilteredItems: React.FC<{
  data: DataModel[];
}> = ({ data }) => {
  useEffect(() => {
    console.log("Filter Data value is ", data);
  }, []);

  return <div>FilteredItems</div>;
};

export default FilteredItems;
