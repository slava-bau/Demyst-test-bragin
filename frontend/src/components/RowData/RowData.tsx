import React from 'react';
import { ReportRow } from '../../interfaces/ReportRow';
import { RowCell } from '../../interfaces/RowCell';
import  formatCurrency from '../../utils/formatCurrency';

const RowData: React.FC<{ reportRow: ReportRow }> = ({ reportRow }) => {
  return (
    <tr>
      {reportRow.Cells.map((cell: RowCell, index: number) => (
        <td key={index}>{formatCurrency(cell.Value)}</td>
      ))}
    </tr>
  );
};

export default RowData;
