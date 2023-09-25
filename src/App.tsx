import React from "react";
import "./App.css";
import TableContainer from "./components/container/TableContainer";
import ViewItemsContainer from "./components/ViewItemsContainer";

function App() {
  return (
    <>
      <div data-component="optimum-aggregate-table-components">
        <ViewItemsContainer />
      </div>
    </>
  );
}

export default App;
