import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RowSection from './RowSection';
import { ReportRow } from '../../interfaces/ReportRow';
import { RowTypeEnum } from '../../enums/RowTypeEnum';

jest.mock('../../utils/formatCurrency');

describe('RowSection', () => {
  it('renders section title if present', () => {
    const mockRow: ReportRow = {
      Title: 'Test Title',
      RowType: RowTypeEnum.Section,
      Rows: [],
      Cells: []
    };

    render(
      <table>
        <tbody>
          <RowSection reportRow={mockRow} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders "No data" if no rows are present', () => {
    const mockRow: ReportRow = {
      Title: 'Test Title',
      RowType: RowTypeEnum.Section,
      Rows: [],
      Cells: []
    };

    render(
      <table>
        <tbody>
          <RowSection reportRow={mockRow} />
        </tbody>
      </table>
    );

    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
