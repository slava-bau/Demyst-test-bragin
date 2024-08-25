import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Report } from '../interfaces/Report';
import { BalanceSheet } from '../interfaces/BalanceSheet';
import ReportComponent from './ReportComponent/ReportComponent';

const App: React.FC = () => {
  const [balanceSheet, setBalanceSheet] = useState<BalanceSheet | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios.get(`${apiUrl}/balance_sheet`)
      .then(response => {
        setBalanceSheet(response.data);
        setError(null);
      })
      .catch(error => {
        setError('Error fetching balance sheet');
      });
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : balanceSheet ? (
        <div className='main-container'>
            {balanceSheet.Reports && balanceSheet.Reports.length > 0 ? (
              balanceSheet.Reports.map((report: Report, index: number) => (
                <ReportComponent key={index} report={report} />
              ))
            ) : (
              <p>No reports available.</p>
            )}
        </div>
      ) : (
        <p>Loading balance sheet...</p>
      )}
    </div>
  );
};

export default App;
