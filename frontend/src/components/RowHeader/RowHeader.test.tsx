import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RowHeader from './RowHeader';
import { ReportRow } from '../../interfaces/ReportRow';
import { RowTypeEnum } from '../../enums/RowTypeEnum';

describe('RowHeader', () => {
  it('renders header cells with correct values', () => {
    const mockRow: ReportRow = {
      Title: 'Test Title',
      RowType: RowTypeEnum.Header,
      Cells: [{ Value: 'Test Header 1' }, { Value: 'Test Header 2' }],
      Rows: [],
    };

    render(
      <table>
        <tbody>
          <RowHeader reportRow={mockRow} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Test Header 1')).toBeInTheDocument();
    expect(screen.getByText('Test Header 2')).toBeInTheDocument();
  });
});
