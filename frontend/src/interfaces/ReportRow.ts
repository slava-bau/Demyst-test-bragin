import { RowTypeEnum } from '../enums/RowTypeEnum';
import { RowCell } from './RowCell';

export interface ReportRow {
  RowType: RowTypeEnum,
  Title:   string,
  Rows:    ReportRow[],
  Cells:   RowCell[]
}
