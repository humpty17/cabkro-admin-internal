import React from 'react';
import { Table, Column, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // Import default styles
import { headerRenderer } from './SearchHeaderRenderer';

const VirtualizedTable = ({
  rowCountAdd=[],
  columns,
  rowHeight = 50,
  headerHeight = 80,
  width,
  height,
  onRowClick,
  bookingfilters,
  rowGetter
}) => {
  return (
    <div style={{ width: "100%", height: height || "300px" }}>
      <AutoSizer>
        {({ width: autoWidth, height: autoHeight }) => (
          <Table
            width={width || autoWidth}
            height={height || autoHeight}
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            rowCount={rowCountAdd.length}
            rowGetter={rowGetter}
            onRowClick={onRowClick}
            rowClassName={({ index }) =>
              index % 2 === 0 ? "virtualized-row" : "virtualized-row alternate"
            }
          >
            {columns.map(({ dataKey, label, width: colWidth }) => (
              <Column
                key={dataKey}
                className= {"virtualized-header"}
                label={label}
                dataKey={dataKey}
                width={colWidth || 100}
                headerRenderer={(props) =>
                  headerRenderer({
                    ...props,
                    bookingfilters,
                    //handleFilterChange,
                  })
                }
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    </div>
  );
};

export default VirtualizedTable;
