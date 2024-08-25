import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RowComponent from './RowComponent';
import { ReportRow } from '../../interfaces/ReportRow';
import { RowTypeEnum } from '../../enums/RowTypeEnum';

describe('RowComponent', () => {
  it('renders RowHeader for Header RowType', () => {
    const mockRow: ReportRow = {
      Title: 'Test Title',
      Rows: [],
      RowType: RowTypeEnum.Header,
      Cells: [{ Value: 'Test Header' }]
    };

    render(
      <table>
        <tbody>
          <RowComponent reportRow={mockRow} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Test Header')).toBeInTheDocument();
  });

  it('renders RowData for Row RowType', () => {
    const mockRow: ReportRow = {
      Title: 'Test Title',
      Rows: [],
      RowType: RowTypeEnum.Row,
      Cells: [{ Value: 'Test Row Data' }]
    };

    render(
      <table>
        <tbody>
          <RowComponent reportRow={mockRow} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Test Row Data')).toBeInTheDocument();
  });

  it('renders RowSummary for SummaryRow RowType', () => {
    const mockRow: ReportRow = {
      Title: 'Test Title',
      Rows: [],
      RowType: RowTypeEnum.SummaryRow,
      Cells: [{ Value: 'Test Summary Data' }]
    };

    render(
      <table>
        <tbody>
          <RowComponent reportRow={mockRow} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Test Summary Data')).toBeInTheDocument();
  });
});
