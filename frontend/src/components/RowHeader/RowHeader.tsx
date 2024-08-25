import React from 'react';
import './RowHeader.css';
import { ReportRow } from '../../interfaces/ReportRow';
import { RowCell } from '../../interfaces/RowCell';

const RowHeader: React.FC<{ reportRow: ReportRow }> = ({ reportRow }) => {
  return (
    <tr>
      {reportRow.Cells.map((cell: RowCell, index: number) => (
        <th key={index} scope="col">{cell.Value}</th>
      ))}
    </tr>
  );
};

export default RowHeader;
