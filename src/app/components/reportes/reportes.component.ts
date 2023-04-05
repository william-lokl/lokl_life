import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { HotToastService } from '@ngneat/hot-toast';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { LoadingService } from '../../services/loading.service';
import Swal from 'sweetalert2';
import { ExcelJson } from 'src/app/interfaces/excel-json';
import { ExportService } from '../../services/export.service';


const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent implements OnInit {
  reports: any = [];
  reportSelect: any = null;
  disabledFin: boolean = true;

  searchForm!: UntypedFormGroup;

  search: any = {
    dateInit: '',
    dateEnd: '',
  };

  today: any = '';
  todayMoment: any = '';
  maxSearch: any = '';

  dataReport: any = [];

  headsName: any = [];
  dataName: any = [];
  width: any = 0;
  page: number = 0;
  pageSize: number = 0;
  collectionSize: any;
  infoReport: any;
  numeroEstado:any;
  idTransaction:any;
  constructor(
    private apiService: ApiService,
    private toastService: HotToastService,
    private formBuilder: UntypedFormBuilder,
    private loading: LoadingService,
    private exportService: ExportService
  ) {

  }

  async ngOnInit() {
    this.today = new Date();
    this.todayMoment = moment(this.today, 'YYYY-MM-DD');
    this.searchForm = this.formBuilder.group({
      dateInit: new UntypedFormControl('', Validators.compose([Validators.required])),
      dateEnd: new UntypedFormControl('', Validators.compose([Validators.required])),
    });

    await this.getListReports();
  }

  async getListReports() {
    let promise = new Promise((resolve, reject) => {
      this.apiService.get(`/reports/getreports`).subscribe(
        async (res: any) => {
          if (res.status === 202) this.showError(res.message);
          else if (!res.status) this.showError(res.message);
          else if (res.status === 404) this.showError(res.message);
          else if (res.data.length === 0) {
            this.showError('No se tiene informacion de tipos reportes');
            reject('Error');
          } else {
            this.reports = res.data;
            resolve(this.reports);
          }
        },
        (error: any) => {
          console.log('Error consultando info reportes', error);
          this.showError(error);
          reject(error);
        }
      );
    });
    return promise;
  }

  async getDataReport() {
    if(this.reportSelect?.idreport === 6 && (this.numeroEstado === undefined || this.numeroEstado === null) && (this.idTransaction === undefined || this.idTransaction === null)){
      this.showError('Debe digitar un Número o Id de trasacción');
      return
    }
    let objReport = {
      reporte: this.reportSelect.idreport,
      fechaIni: this.search.dateInit,
      fechaFin: this.search.dateEnd,
    };


    let number = {
      type:1,
      code:this.numeroEstado
    };

    let idtransaction = {
      type:2,
      code:this.idTransaction
    };
    console.log('ObjReport', objReport);

    const loading: any = this.loading.show(
      'Cargando información, por favor espere...'
    );

    const url = this.reportSelect?.idreport === 6 ? '/reports/transaction-status' : `/reports/getinforeport`

    let promise = new Promise((resolve, reject) => {
      this.apiService.post(url, this.reportSelect?.idreport === 6 && (this.numeroEstado !== undefined || this.numeroEstado !== null)? number : this.reportSelect?.idreport === 6 && (this.idTransaction !== undefined || this.idTransaction !== null) ? idtransaction : objReport).subscribe(
        async (res: any) => {
          loading.close();
          if (res.status === 202) this.showError(res.message);
          else if (!res.status) this.showError(res.message);
          else if (res.status === 404) this.showError(res.message);
          else if (res.data.length === 0) {
            this.dataReport = [];
            this.showError('No se encontraron resultados del reporte');
            reject('Error');
          } else {
            this.infoReport = res.data
            this.page = 1;
          	this.pageSize = 10;
            this.collectionSize = this.infoReport.length;
            this.refreshCountries()
            this.headsName = this.reportSelect.labelsreport.split(',');
            this.dataName = this.reportSelect.fieldsreport.split(',');
            this.width = 100 / this.dataName.length;
            // console.log(res.data);
            resolve(res.data);
          }
        },
        (error: any) => {
          loading.close();
          console.log('Error consultando reporte', error);
          this.showError(error);
          reject(error);
        }
      );
    });
    return promise;
  }

  selectInitDate() {
    if (this.search.dateInit) {
      this.disabledFin = false;

      this.maxSearch = moment(this.search.dateInit, 'YYYY-MM-DD').add(
        90,
        'days'
      );

      if (this.maxSearch.isAfter(this.todayMoment)) this.maxSearch = this.todayMoment.format('YYYY-MM-DD');

      this.search.dateEnd = this.maxSearch;
    }
  }

  async clickConsultar() {
    console.log(this.reportSelect)
    await this.getDataReport();
  }

  showDetail(data: any) {
    let labels = '';
    for (let index = 0; index < this.headsName.length; index++) {
      labels =
        labels +
        `
        <div class="grid grid-cols-2">
          <div class="relative text-left">
            <span class="text-sm">${this.headsName[index]}</span>
          </div>
          <div class="relative text-left">
            <span class="text-sm">${data[this.dataName[index]]}</span>
          </div>
        </div>
        `;
    }

    Swal.fire({
      title: 'Detalle',
      html: `
            <div>
                <form class="mt-1.5 space-y-4" >

                  ${labels}

                </form>
            </div>
      `,
      confirmButtonText: 'Cerrar',
      focusConfirm: false,
      showCloseButton: true,
      showLoaderOnConfirm: true,
      width: '400px',
      preConfirm: async () => {
        return true;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result: any) => {});
  }

  exportToExcel(): void {
    const loading: any = this.loading.show(
      'Generando excel, por favor espere...'
    );

    try {
      const edata: Array<ExcelJson> = [];
      const udt: ExcelJson = {
        data: [
          this.headsName.reduce((obj: any, cur: any, i: any) => {
            return { ...obj, [i]: cur };
          }, {}),
        ],
        skipHeader: true,
      };

      this.dataReport.forEach((data: any, index: any) => {
        let value = {};
        this.headsName.forEach((head: any, i: any) => {
          Object.assign(value, { [i]: data[this.dataName[i]] });
        });
        udt.data.push(value);
      });

      edata.push(udt);
      loading.close();
      this.exportService.exportJsonToExcel(
        edata,
        `${moment().unix()}_${this.reportSelect.descreport}`
      );
    } catch (e) {
      loading.close();
      console.log('Error generando excel', e);
      this.showError(e);
    }
  }

  showError(error: any) {
    this.dataReport = [];
    this.toastService.error(
      typeof error === 'object'
        ? '¡Lo sentimos! Estamos presentando problemas. Intenta más tarde'
        : error
    );
  }

  refreshCountries() {
		this.dataReport = this.infoReport.map((country:any, i:any) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
}
