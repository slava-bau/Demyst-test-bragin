import { ReportRow } from './ReportRow';

export interface Report {
  "ReportID":     string,
  "ReportType":   string,
  "ReportName":   string,
  "ReportDate":   string,
  "ReportTitles": string[],
  "Rows":         ReportRow[]
}
