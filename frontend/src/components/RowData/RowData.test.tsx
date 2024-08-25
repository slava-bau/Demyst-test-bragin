import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RowData from './RowData';
import { ReportRow } from '../../interfaces/ReportRow';
import formatCurrency from '../../utils/formatCurrency';
import { RowTypeEnum } from '../../enums/RowTypeEnum';

jest.mock('../../utils/formatCurrency');

describe('RowData', () => {
  it('renders table cells with formatted currency', () => {
    (formatCurrency as jest.Mock).mockReturnValue('$100');

    const mockRow: ReportRow = {
      Title: 'Test Title',
      RowType: RowTypeEnum.Row,
      Rows: [],
      Cells: [{ Value: '100' }]
    };

    render(
      <table>
        <tbody>
          <RowData reportRow={mockRow} />
        </tbody>
      </table>
    );

    expect(screen.getByText('$100')).toBeInTheDocument();
  });
});
