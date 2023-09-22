import React, { useState } from "react";
import FilterContainer from "../FiltersContainer/FilterContainer";
import "../FiltersContainer/FilterContainer.scss";

interface TableContainerProps {
  authoredFilters: string[];
  filterTheme: string;
  filtersPopulation?: String;
  // resultFilteredData:any[]
}

const TableContainer: React.FC<TableContainerProps> = (props) => {
  const [initialData] = useState([
    {
      accountGroup: "Equities",
      accountName: "Walter Scott Global Equity Fund",
      view: "",
      apirCode: "MAQ0410AU",
      asOfDate: "30 June 2021",
      "1m": "0.03",
      "3m": "0.06",
      "6m": "0.19",
      "1y": "0.26",
      "3y": "0.12",
      "5y": "0.12",
      since_inception: "0.09",
    },
    {
      accountGroup: "Fixed income and cash",
      accountName: "Macquarie Dynamic Bond Fund",
      view: "",
      apirCode: "MAQ0274AU",
      asOfDate: "30 June 2023",
      "1m": "-0.01",
      "3m": "-0.02",
      "6m": "0.03",
      "1y": "0.00",
      "3y": "-0.026",
      "5y": "0.01",
      since_inception: "0.04",
    },
    {
      accountGroup: "Macquire",
      accountName: "Macquarie Income Opportunities Fund",
      view: "",
      apirCode: "MAQ0277AU",
      asOfDate: "30 June 2020",
      "1m": "-0.05",
      "3m": "-0.06",
      "6m": "0.01",
      "1y": "0.03",
      "3y": "0.06",
      "5y": "0.01",
      since_inception: "0.04",
    },
    {
      accountGroup: "Funds",
      accountName: "Macquarie Income Opportunities Fund",
      view: "",
      apirCode: "MAQ0277AU",
      asOfDate: "30 June 2020",
      "1m": "-0.05",
      "3m": "-0.06",
      "6m": "0.01",
      "1y": "0.03",
      "3y": "0.06",
      "5y": "0.01",
      since_inception: "0.04",
    },
  ]);

  const [filteredData, setFilteredData] = useState<any[]>(initialData);

  const handleSetFilteredData = (filteredRows: any[]) => {
    //setFilteredData(filteredRows);
    console.log("filteredRows " + filteredRows);
  };

  console.log(filteredData, "FILTERED-DATA");

  return (
    <div className="aggregate-table">
      <header>Company Logo</header>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit debitis
        consequatur animi cupiditate at deserunt est incidunt voluptatem
        deleniti dignissimos autem vel suscipit consequuntur magnam
        exercitationem rerum tenetur officiis, qui excepturi? Maxime repellendus
        accusamus sunt tempora soluta magni dolore impedit nobis blanditiis
        sequi repellat facere, amet dolorum illum quia, fuga atque optio eaque
        tenetur quod praesentium commodi maiores. Reprehenderit necessitatibus
        incidunt alias expedita officia dolorem veniam deleniti placeat
        temporibus optio! Sed eaque adipisci excepturi necessitatibus? Nihil
        harum eos, earum doloremque vel quo quia perferendis numquam est fugit
        expedita aliquam facilis recusandae, quos hic! Quam consectetur earum
        neque aspernatur optio! Doloremque!
      </div>
      <div className="filter-table-container">
        <FilterContainer
          authoredFilters={props.authoredFilters}
          setFilteredData={setFilteredData}
          initialData={initialData}
          setFilteredRows={handleSetFilteredData}
          autoFiltersPopulation={false}
          filterTheme={props.filterTheme}
        />
      </div>
      <div>
        {filteredData.map((data) => {
          return (
            <div style={{ border: "1px solid black", padding: "10px" }}>
              <h1>Account Group : {data.accountGroup}</h1>
              <h4>Account Name :{data.apirCode}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableContainer;
