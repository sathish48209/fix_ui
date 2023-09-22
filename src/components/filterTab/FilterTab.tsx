import "./FilterTab.scss";

const FilterTab = (props: any) => {
  return (
    <div
      className={`${
        props.toggleState ? "dropdown-dark" : "dropdown-white"
      } tab-header`}
      onClick={props.onClick}
    >
      <div className="dd-selected-value">Asset Class</div>
      {/* <span
              className={
                props.toggleState
                  ? "icon-chevron-up filter-icon-stack"
                  : "icon-chevron-down filter-icon-stack"
              }
            ></span> */}
      <span>I</span>
    </div>
  );
};

export default FilterTab;
