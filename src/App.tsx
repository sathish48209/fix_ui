import React from "react";
import "./App.css";
import TableContainer from "./components/container/TableContainer";

function App() {
  return (
    <>
      <div data-component="optimum-aggregate-table-components">
        <TableContainer
          authoredFilters={[
            "Equities",
            "Fixed income and cash",
            "Optimum",
            "Macquire",
            "Funds",
            "shares",
            "quotes",
            "emamtf",
          ]}
          filterTheme="theme-green"
        />
      </div>
    </>
  );
}

export default App;
