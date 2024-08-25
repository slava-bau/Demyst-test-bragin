import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReportComponent from './ReportComponent';
import { Report } from '../../interfaces/Report';
import { RowTypeEnum } from '../../enums/RowTypeEnum';

describe('ReportComponent', () => {
  it('renders report name and date', () => {
    const mockReport: Report = {
      ReportID: '',
      ReportType: '',
      ReportName: 'Balance Sheet',
      ReportDate: '2024-08-25',
      ReportTitles: [],
      Rows: []
    };

    render(<ReportComponent report={mockReport} />);

    expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
    expect(screen.getByText('2024-08-25')).toBeInTheDocument();
  });

  it('renders report rows correctly', () => {
    const mockReport: Report = {
      ReportID: '',
      ReportType: '',
      ReportName: 'Balance Sheet',
      ReportDate: '2024-08-25',
      ReportTitles: [],
      Rows: [
        {
          Title: 'Test Title',
          RowType: RowTypeEnum.Header,
          Rows: [],
          Cells: [{ Value: 'Header' }]
        },
        {
          Title: 'Test Title',
          RowType: RowTypeEnum.Row,
          Rows: [],
          Cells: [{ Value: 'Row Data' }]
        }
      ]
    };

    render(<ReportComponent report={mockReport} />);

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Row Data')).toBeInTheDocument();
  });
});
