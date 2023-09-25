import React, { useEffect, useState } from "react";
import { DataModel } from "../types/Filters";
import { DATA_MODELS } from "../mocks/FilterDetails";
import FilteredItems from "./FilteredItems";
import Tabset from "./shared/Tabset";

const ViewItemsContainer = () => {
  const [dataModel, setDataModel] = useState<DataModel[]>([]);
  const [filteredDataModel, setFilteredDataModel] = useState<DataModel[]>([]);

  useEffect(() => {
    //TODO: Make the actual API request to fetch the data models
    setDataModel(DATA_MODELS);
    setFilteredDataModel(DATA_MODELS);
  }, []);

  return (
    <>
      <Tabset />
      <FilteredItems data={filteredDataModel} />
    </>
  );
};

export default ViewItemsContainer;
