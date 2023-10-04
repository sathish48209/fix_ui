import React, { useEffect, useState } from "react";
import { DataModel, FilterModel } from "../types/Filters";
import { DATA_MODELS, FILTER_DETAILS } from "../mocks/FilterDetails";
import FilteredItems from "./FilteredItems";
import Tabset from "./shared/Tabset";
import "./styles/ViewItemsContainer.scss";

const ViewItemsContainer = () => {
  const [dataModel, setDataModel] = useState<DataModel[]>([]);
  const [filteredDataModel, setFilteredDataModel] = useState<DataModel[]>([]);
  const [filterDetails, setFilterDetails] =
    useState<FilterModel[]>(FILTER_DETAILS);
  const [filtersApplied, setFiltersApplied] = useState<
    Record<string, string[]>
  >({});
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    //TODO: Make the actual API request to fetch the data models
    setDataModel(DATA_MODELS);
    setFilteredDataModel(DATA_MODELS);
    setItemsCount(DATA_MODELS.length);
  }, []);

  // To handle the Auto Filter population logic
  // Once the Data Model loads, check for Auto population field and update the filter
  useEffect(() => {
    const filterModels = filterDetails.map((model: FilterModel) => {
      let filters: string[] = [];
      dataModel.forEach((data) => {
        const value = data[model.aggregateTableKey as keyof DataModel];
        // To avoid duplicate entires being pushed to filters
        if (!filters.includes(value)) {
          filters.push(value);
        }
      });

      return {
        ...model,
        filters,
      };
    });

    setFilterDetails([...filterModels]);
  }, [dataModel]);

  useEffect(() => {
    const hasFilters = Object.entries(filtersApplied).some(
      ([key, value]) => value.length > 0
    );

    if (!hasFilters) {
      setItemsCount(dataModel.length);
      return;
    }

    const filteredItemsCount = dataModel.filter((data) => {
      return Object.entries(filtersApplied).every(([key, value]) =>
        value.includes(data[key as keyof DataModel])
      );
    }).length;
    setItemsCount(filteredItemsCount);
  }, [filtersApplied]);

  const handleViewResults = () => {
    const hasFilters = Object.entries(filtersApplied).some(
      ([key, value]) => value.length > 0
    );

    if (!hasFilters) {
      setFilteredDataModel([...dataModel]);
      return;
    }

    const filteredData = dataModel.filter((data) => {
      return Object.entries(filtersApplied).every(([key, value]) =>
        value.includes(data[key as keyof DataModel])
      );
    });

    setFilteredDataModel(filteredData);

    console.log("Filters Applied ", filtersApplied);
  };

  const handleResetFilters = () => {
    setFiltersApplied({});
    setFilteredDataModel([...dataModel]);
  };

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum quia
        earum enim. Eius doloribus quis, harum fuga sit minus autem fugit
        numquam totam inventore magnam ad, cupiditate dicta nemo dolore? Officia
        iste voluptate quas commodi! Asperiores doloremque autem accusamus velit
        temporibus sunt rerum, vero facere voluptate est repellat nobis quae
        tempora id recusandae minus ex quaerat reiciendis, eos dolorum! Saepe,
        accusantium. Dolorem velit vel odit nobis quisquam est ea nihil ab.
        Provident, aut dolore deleniti asperiores minima aspernatur. Nisi
        voluptates nobis harum, atque labore quis aspernatur laboriosam iure
        velit autem at vero quas doloribus eius et ratione ipsa? Eveniet, eum.
      </div>
      <Tabset
        filterDetails={filterDetails}
        filtersApplied={filtersApplied}
        setFiltersApplied={setFiltersApplied}
        handleViewResults={handleViewResults}
        handleResetFilters={handleResetFilters}
        itemsCount={itemsCount}
      />
      <div className="filters-info">{filteredDataModel.length} Items</div>
      <FilteredItems data={filteredDataModel} />
    </>
  );
};

export default ViewItemsContainer;
