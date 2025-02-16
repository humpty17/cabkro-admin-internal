import { useState } from "react";
import { ACTION } from "../../ConstStates";

export const headerRenderer = ({ dataKey, label, tableSearchFilters, handleFilterChange , isShow}) => {

  // const [value, setValue] = useState("")

  const handleChange  = (e)=>{
    // setValue(e.target.value)
    handleFilterChange(e.target.value, dataKey)
  }
  return (
    <>
      {isShow ? <><div className="ReactVirtualized__Table__headerTruncatedText">
        {label}
      </div>
      {label !== ACTION && dataKey !== 'srNo'? (
        <input
          name={dataKey}
          type="text"
          placeholder={`Search`}
          className="search"
          // value={value} // Ensure no undefined value
          onChange={handleChange}
          // style={{ width: "90%", padding: "4px", marginTop: "1px" }}
        />
      ) : (
        <div style={{ marginBottom: "28px" }}></div>
      )}</> : null}
    </>
  );
};
