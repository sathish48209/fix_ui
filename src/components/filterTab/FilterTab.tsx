import "./FilterTab.scss";

const FilterTab = (props: any) => {
  return (
    <div>
      <span className="filter-label">Filter by</span>
      <div
        className={props.toggleState ? "dropdown-dark" : "dropdown-white"}
        onClick={props.onClick}
      >
        <div className="dd-wrapper">
          <div className="dd-trigger">
            <div className="dd-selected-value">Asset Class</div>
            <span
              className={
                props.toggleState
                  ? "icon-chevron-up filter-icon-stack"
                  : "icon-chevron-down filter-icon-stack"
              }
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTab;
