import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-selectciudad',
  templateUrl: './selectciudad.component.html',
  styleUrls: ['./selectciudad.component.scss'],
})
export class SelectciudadComponent implements OnInit, OnChanges, OnDestroy {
  cities: any;
  @Input() pais: any = '';
  @Input() state: any = '';
  @Output() ciudadCambiada = new EventEmitter<any>();
  selectedciudad = '';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['state']) {
      this.getData();
    }
  }

  ngOnDestroy() {
    if (this.ciudadCambiada) {
      this.ciudadCambiada.unsubscribe();
    }
  }

  getData(): void {
    this.cities = [];

    const url = ` https://api.countrystatecity.in/v1/countries/${this.pais}/states/${this.state}/cities`;
    const headers = new HttpHeaders({
      'X-CSCAPI-KEY':
        'aXhBaXdiUlEzUWxPTWwydVJ2dk14SGpSMm1TUEFOM0VwUm0wTUJ5VA==',
    });

    this.http.get(url, { headers: headers }).subscribe(
      (data) => {
        //console.log(data);
        this.cities = data;
        this.cities.sort();
      },
      (error) => {
        console.error(error);
        this.cities = [];
      }
    );
  }

  onCiudadChange(value: any) {
    console.log(value);
    this.ciudadCambiada.emit({ propiedad: 'ciudad', valor: value });
  }
}
