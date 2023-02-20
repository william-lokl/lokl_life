import { Injectable, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../interfaces/excel-json';

const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {}
  /**
   * Creates XLSX option from the Json data. Use this to customize the sheet by adding arbitrary rows and columns.
   *
   * @param json Json data to create xlsx.
   * @param fileName filename to save as.
   */
  public exportJsonToExcel(json: ExcelJson[], fileName: string): void {
    // inserting first blank row
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      json[0].data,
      this.getOptions(json[0])
    );

    for (let i = 1, length = json.length; i < length; i++) {
      // adding a dummy row for separation
      XLSX.utils.sheet_add_json(
        worksheet,
        [{}],
        this.getOptions(
          {
            data: [],
            skipHeader: true,
          },
          -1
        )
      );
      XLSX.utils.sheet_add_json(
        worksheet,
        json[i].data,
        this.getOptions(json[i], -1)
      );
    }
    const workbook: XLSX.WorkBook = {
      Sheets: { Sheet1: worksheet },
      SheetNames: ['Sheet1'],
    };
    // save to file
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);
  }

  /**
   * Creates the XLSX option from the data.
   *
   * @param json Json data to create xlsx.
   * @param origin XLSX option origin.
   * @returns options XLSX options.
   */
  private getOptions(json: ExcelJson, origin?: number): any {
    // adding actual data
    const options: any = {
      skipHeader: true,
      origin: -1,
      header: [],
    };
    options.skipHeader = json.skipHeader ? json.skipHeader : false;
    if (!options.skipHeader && json.header && json.header.length) {
      options.header = json.header;
    }
    if (origin) {
      options.origin = origin ? origin : -1;
    }
    return options;
  }
}
