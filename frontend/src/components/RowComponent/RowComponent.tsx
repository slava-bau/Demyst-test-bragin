import React from 'react';
import { ReportRow } from '../../interfaces/ReportRow';
import { RowTypeEnum } from '../../enums/RowTypeEnum';
import RowHeader from '../RowHeader/RowHeader';
import RowSection from '../RowSection/RowSection';
import RowData from '../RowData/RowData';
import RowSummary from '../RowSummary/RowSummary';

const RowComponent: React.FC<{ reportRow: ReportRow }> = ({ reportRow }) => {
  switch (reportRow.RowType) {
    case RowTypeEnum.Header:
      return <RowHeader reportRow={reportRow} />;
    case RowTypeEnum.Section:
      return <RowSection reportRow={reportRow} />;
    case RowTypeEnum.Row:
      return <RowData reportRow={reportRow} />;
    case RowTypeEnum.SummaryRow:
      return <RowSummary reportRow={reportRow} />;
    default:
      return null;
  }
};

export default RowComponent;
