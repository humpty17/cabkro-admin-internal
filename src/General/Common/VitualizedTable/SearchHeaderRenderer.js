import { ACTION } from "../../ConstStates";

export const headerRenderer = ({ dataKey, label, tableSearchFilters, handleFilterChange }) => {
  return (
    <div>
      <div className="ReactVirtualized__Table__headerTruncatedText">
        {label}
      </div>
      {label !== ACTION && dataKey !== 'srNo'? (
        <input
          type="text"
          placeholder={`Search`}
          className="search"
          value={tableSearchFilters[dataKey] || ""} // Ensure no undefined value
          //onChange={(e) => handleFilterChange(dataKey, e.target.value)}
          // style={{ width: "90%", padding: "4px", marginTop: "1px" }}
        />
      ) : (
        <div style={{ marginBottom: "28px" }}></div>
      )}
    </div>
  );
};
