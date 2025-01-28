import React from 'react';
import { Table, Column, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // Import default styles
import { headerRenderer } from './SearchHeaderRenderer';

const VirtualizedTable = ({
  
  tableData=[],
  columns,
  rowHeight = 50,
  headerHeight = 80,
  width,
  height,
  onRowClick,
  tableSearchFilters
}) => {
  const rowGetter = ({ index }) => tableData[index];

  const totalColumnWidth = columns.reduce((total, column) => total + (column.width || 100), 0);
  //console.log(columns.reduce((total, column) => total + (column.width || 100), 0));
  
  return (
    <div style={{ width: "100%", height: height || "350px",overflowY: "hidden" }}>
      <AutoSizer>
        {({ width: autoWidth, height: autoHeight }) => (
          <Table
            width={Math.max(width || autoWidth, totalColumnWidth)} 
            height={height || autoHeight}
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            rowCount={tableData.length}
            rowGetter={rowGetter}
            onRowClick={onRowClick}
            scrollToAlignment={"start"}
            rowClassName={({ index }) =>
              index % 2 === 0 ? "virtualized-row" : "virtualized-row alternate"
            }
          >
            {columns.map(({ dataKey, label, width: colWidth,cellRenderer,flexGrow = 1, isShow }) => (
              isShow ? <Column
                key={dataKey}
                className= {"virtualized-header"}
                label={label}
                dataKey={dataKey}
                width={colWidth || 150}
                flexGrow={flexGrow}   
                flexShrink={1} 
                cellRenderer={cellRenderer}
                headerRenderer={(props) =>
                  headerRenderer({
                    ...props,
                    tableSearchFilters,isShow
                    //handleFilterChange,
                  })
                }
              /> :null
            ))}
          </Table>
        )}
      </AutoSizer>
    </div>
  );
};

export default VirtualizedTable;
