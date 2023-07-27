import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-selectdepartamento',
  templateUrl: './selectdepartamento.component.html',
  styleUrls: ['./selectdepartamento.component.scss'],
})
export class SelectdepartamentoComponent
  implements OnInit, OnChanges, OnDestroy
{
  states: any;
  constructor(private http: HttpClient) {}
  @Input() pais: any = '';
  @Output() statecambiado = new EventEmitter<any>();
  selectedState = '';
  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges() {
    this.getData();
  }

  ngOnDestroy() {
    if (this.statecambiado) {
      this.statecambiado.unsubscribe();
    }
  }

  getData() {
    this.states = [];
    const url = `https://api.countrystatecity.in/v1/countries/${this.pais}/states`;
    const headers = new HttpHeaders({
      'X-CSCAPI-KEY':
        'aXhBaXdiUlEzUWxPTWwydVJ2dk14SGpSMm1TUEFOM0VwUm0wTUJ5VA==',
    });

    this.http.get(url, { headers: headers }).subscribe(
      (data) => {
        //console.log(data);
        this.states = data;
        this.states.sort();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onStateChange(value: any) {
    console.log(value);
    this.statecambiado.emit({ propiedad: 'state', valor: value });
  }
}
