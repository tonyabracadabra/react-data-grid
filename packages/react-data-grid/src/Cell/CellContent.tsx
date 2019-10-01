import React from 'react';
import classNames from 'classnames';

import { CellMetaData } from '../common/types';
import ChildRowDeleteButton from '../ChildRowDeleteButton';
import { CellProps } from '../Cell';
import CellValue from './CellValue';

export type CellContentProps<R> = Pick<CellProps<R>,
'idx'
| 'rowIdx'
| 'rowData'
| 'column'
| 'value'
| 'isScrolling'
| 'expandableOptions'
| 'tooltip'
| 'height'
| 'cellControls'
> & Pick<CellMetaData<R>,
'onDeleteSubRow'
>;


export default function CellContent<R>({
  idx,
  rowIdx,
  column,
  rowData,
  value,
  tooltip,
  expandableOptions,
  height,
  onDeleteSubRow,
  cellControls,
  isScrolling
}: CellContentProps<R>) {
  const isExpandCell = expandableOptions ? expandableOptions.field === column.key : false;
  const treeDepth = expandableOptions ? expandableOptions.treeDepth : 0;
  const marginLeft = expandableOptions && isExpandCell ? expandableOptions.treeDepth * 30 : 0;

  function handleDeleteSubRow() {
    if (onDeleteSubRow) {
      onDeleteSubRow({
        idx,
        rowIdx,
        rowData,
        expandArgs: expandableOptions
      });
    }
  }

  const cellDeleter = expandableOptions && treeDepth > 0 && isExpandCell && (
    <ChildRowDeleteButton
      treeDepth={treeDepth}
      cellHeight={height}
      onDeleteSubRow={handleDeleteSubRow}
      isDeleteSubRowEnabled={!!onDeleteSubRow}
    />
  );

  const classes = classNames('react-grid-Cell__value',
    { 'cell-tooltip': !!tooltip }
  );

  return (
    <div className={classes}>
      {cellDeleter}
      <div className="react-grid-Cell__container" style={{ marginLeft }}>
        <span>
          <CellValue<R>
            rowIdx={rowIdx}
            rowData={rowData}
            column={column}
            value={value}
            isScrolling={isScrolling}
          />
        </span>
        {cellControls}
      </div>
      {tooltip && <span className="cell-tooltip-text">{tooltip}</span>}
    </div>
  );
}