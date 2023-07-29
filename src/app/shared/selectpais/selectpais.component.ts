import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CustomSelectElement } from 'src/app/checkout/interfaces/customSelectElement.interface';

@Component({
  selector: 'app-selectpais',
  templateUrl: './selectpais.component.html',
  styleUrls: ['./selectpais.component.scss'],
})
export class SelectpaisComponent implements OnInit, OnDestroy {
  countries: any;
  data: CustomSelectElement[] = [];
  selectedCountry: any;
  @Output() valorCambiado = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();


  }

  ngOnDestroy() {
    if (this.valorCambiado) {
      this.valorCambiado.unsubscribe();
    }
  }

  getData() {
    const url = 'https://api.countrystatecity.in/v1/countries/';
    const headers = new HttpHeaders({
      'X-CSCAPI-KEY':
        'aXhBaXdiUlEzUWxPTWwydVJ2dk14SGpSMm1TUEFOM0VwUm0wTUJ5VA==',
    });

    this.http.get(url, { headers: headers }).subscribe(
      (data) => {
        this.countries = data;
        this.countries.sort();
        this.selectedCountry =
          this.countries.find((country: any) => country.name === 'Colombia') ||
          this.countries[0];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onCountryChange(value: any) {
    this.valorCambiado.emit({ propiedad: 'pais', valor: value });
  }
}
