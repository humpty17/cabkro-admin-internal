import React from 'react';
import { Table, Column, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // Import default styles

const VirtualizedTable = ({
  data,
  columns,
  rowHeight = 50,
  headerHeight = 60,
  width,
  height,
  onRowClick,
}) => {
  return (
    <div style={{ width: '100%', height: height || '400px' }}>
      <AutoSizer>
        {({ width: autoWidth, height: autoHeight }) => (
          <Table
            width={width || autoWidth}
            height={height || autoHeight}
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            rowCount={data.length}
            rowGetter={({ index }) => data[index]}
            onRowClick={onRowClick}
          >
            {columns.map(({ dataKey, label, width: colWidth }) => (
              <Column
                key={dataKey}
                label={label}
                dataKey={dataKey}
                width={colWidth || 100}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    </div>
  );
};

export default VirtualizedTable;
