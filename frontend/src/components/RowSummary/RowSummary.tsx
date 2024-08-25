import React from 'react';
import './RowSummary.css';
import { ReportRow } from '../../interfaces/ReportRow';
import { RowCell } from '../../interfaces/RowCell';
import  formatCurrency from '../../utils/formatCurrency';

const RowSummary: React.FC<{ reportRow: ReportRow }> = ({ reportRow }) => {
  return (
    <tr>
      {reportRow.Cells.map((cell: RowCell, index: number) => (
        <td key={index}><strong>{formatCurrency(cell.Value)}</strong></td>
      ))}
    </tr>
  );
};

export default RowSummary;
