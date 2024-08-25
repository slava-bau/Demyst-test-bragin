import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RowSummary from './RowSummary';
import { ReportRow } from '../../interfaces/ReportRow';
import { RowCell } from '../../interfaces/RowCell';
import formatCurrency from '../../utils/formatCurrency';
import { RowTypeEnum } from '../../enums/RowTypeEnum';

jest.mock('../../utils/formatCurrency');

describe('RowSummary', () => {
  it('renders summary cells with formatted currency in bold', () => {
    (formatCurrency as jest.Mock).mockReturnValue('$100');

    const mockCell: RowCell = {
      Value: '100'
    };

    const mockRow: ReportRow = {
      RowType: RowTypeEnum.SummaryRow,
      Title: '',
      Rows: [],
      Cells: [mockCell]
    };

    render(
      <table>
        <tbody>
          <RowSummary reportRow={mockRow} />
        </tbody>
      </table>
    );

    const cell = screen.getByText('$100');
    expect(cell).toBeInTheDocument();
    expect(cell.tagName).toBe('STRONG');
  });
});
