import React from 'react';
import './RowSection.css';
import RowComponent from '../RowComponent/RowComponent';
import { ReportRow } from '../../interfaces/ReportRow';

const RowSection: React.FC<{ reportRow: ReportRow }> = ({ reportRow }) => {
  if (reportRow.Title === '' && reportRow.Rows.length === 0) {
    return null;
  }

  // colSpan={100} and colSpan={200} are used to ensure that the <td> element spans across all columns of the table.
  // Since these are arbitrarily large numbers, they effectively cover any number of columns in the table,
  // allowing the inner text to be displayed across the entire width of the table.
  return (
    <>
      {reportRow.Title === '' ? (
        <></>
      ) : (
        <tr>
          <td colSpan={100}>{reportRow.Title}</td>
        </tr>
      )}
      {reportRow.Rows.length === 0 ? (
        <tr>
          <td colSpan={200}>No data</td>
        </tr>
      ) : (
        reportRow.Rows.map((subRow: ReportRow, index: number) => (
          <RowComponent key={index} reportRow={subRow} />
        ))
      )}
    </>
  );
};

export default RowSection;
