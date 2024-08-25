import React from 'react';
import './ReportComponent.css';
import { Report } from '../../interfaces/Report';
import { ReportRow } from '../../interfaces/ReportRow';
import RowComponent from '../RowComponent/RowComponent';
import { RowTypeEnum } from '../../enums/RowTypeEnum';

const ReportComponent: React.FC<{ report: Report }> = ({ report }) => {
  return (
    <div className='report-container'>
      <table>
        <caption>
          <span>{report.ReportName}</span><br/><span>{report.ReportDate}</span>
        </caption>
        <thead>
          {report.Rows
            .filter((reportRow: ReportRow) => reportRow.RowType === RowTypeEnum.Header)
            .map((reportRow: ReportRow, index: number) => (
              <RowComponent key={index} reportRow={reportRow} />
          ))}
        </thead>
        <tbody>
          {report.Rows
            .filter((reportRow: ReportRow) => reportRow.RowType !== RowTypeEnum.Header)
            .map((reportRow: ReportRow, index: number) => (
              <RowComponent key={index} reportRow={reportRow} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportComponent;
