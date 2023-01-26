import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { HotToastService } from '@ngneat/hot-toast';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent implements OnInit {
  reports: any = [];
  reportSelect: any = null;
  disabledFin: boolean = true;

  searchForm!: FormGroup;

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

  constructor(
    private apiService: ApiService,
    private toastService: HotToastService,
    private formBuilder: FormBuilder,
    private loading: LoadingService
  ) {}

  async ngOnInit() {
    this.today = new Date();
    this.todayMoment = moment(this.today, 'YYYY-MM-DD');
    this.searchForm = this.formBuilder.group({
      dateInit: new FormControl('', Validators.compose([Validators.required])),
      dateEnd: new FormControl('', Validators.compose([Validators.required])),
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
    let objReport = {
      reporte: this.reportSelect.idreport,
      fechaIni: this.search.dateInit,
      fechaFin: this.search.dateEnd,
    };

    console.log('ObjReport', objReport);

    const loading: any = this.loading.show(
      'Cargando información, por favor espere...'
    );

    let promise = new Promise((resolve, reject) => {
      this.apiService.post(`/reports/getinforeport`, objReport).subscribe(
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
            this.dataReport = res.data;
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

      if (this.maxSearch.isAfter(this.todayMoment)) this.maxSearch = this.today;

      this.search.dateEnd = '';
    }
  }

  selectPais() {}

  async clickConsultar() {
    await this.getDataReport();
  }

  showError(error: any) {
    this.dataReport = [];
    this.toastService.error(
      typeof error === 'object'
        ? '¡Lo sentimos! Estamos presentando problemas. Intenta más tarde'
        : error
    );
  }
}
