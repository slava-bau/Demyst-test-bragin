import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import { Report } from '../interfaces/Report';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  process.env.REACT_APP_API_URL = 'http://localhost:5000';
});

describe('App', () => {
  it('renders loading message initially', async () => {
    await act(async () => {
      mockedAxios.get.mockImplementationOnce(() =>
        new Promise(resolve => setTimeout(() => resolve({ data: {} }), 100))
      );
      render(<App />);
    });

    expect(screen.getByText(/Loading balance sheet.../i)).toBeInTheDocument();
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
  });

  it('renders no reports available message when API returns empty array', async () => {
    await act(async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { Reports: [] } });
      render(<App />);
    });

    expect(screen.getByText(/No reports available./i)).toBeInTheDocument();
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(2));
  });

  it('renders report components when API returns data', async () => {
    const mockReports: Report[] = [
      { ReportName: 'Report Name 1', ReportDate: 'Report Date 1', ReportID: '', ReportType: '', ReportTitles: [], Rows: [] },
      { ReportName: 'Report Name 2', ReportDate: 'Report Date 2', ReportID: '', ReportType: '', ReportTitles: [], Rows: [] },
    ];
    await act(async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { Reports: mockReports } });
      render(<App />);
    });

    mockReports.forEach(report => {
      expect(screen.getByText(report.ReportName)).toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    const mockReports: Report[] = [
      { ReportName: 'Report Name 1', ReportDate: 'Report Date 1', ReportID: '', ReportType: '', ReportTitles: [], Rows: [] },
      { ReportName: 'Report Name 2', ReportDate: 'Report Date 2', ReportID: '', ReportType: '', ReportTitles: [], Rows: [] },
    ];

    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    await act(async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { Reports: mockReports } });
      render(<App />);
    });

    expect(screen.getByText(/Error fetching balance sheet/i)).toBeInTheDocument();
  });
});
