export const headerRenderer = ({ dataKey, label, bookingfilters, handleFilterChange }) => {
  return (
    <div>
      <div className="ReactVirtualized__Table__headerTruncatedText">{label}</div>
      <input
        type="text"
        placeholder={`Search ${label}`}
        value={bookingfilters[dataKey] || ''} // Ensure no undefined value
        //onChange={(e) => handleFilterChange(dataKey, e.target.value)}
        style={{ width: "90%", padding: "4px", marginTop: "1px" }}
      />
    </div>
  );
};
