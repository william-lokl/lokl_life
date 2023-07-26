import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomSelectElement } from '../../interfaces/customSelectElement.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-autentificacion',
  templateUrl: './autentificacion.component.html',
  styleUrls: ['./autentificacion.component.scss'],
})
export class AutentificacionComponent implements OnInit {
  resolucion_movil: boolean = false;
  countries: string[] = [];
  selectedCountry: string = 'Colombia';
  cities: string[] = [];
  paso1: boolean = true;
  paso2: boolean = false;
  paso3: boolean = false;

  body!: FormGroup;

  public opcionesSelect: CustomSelectElement[] = [
    //{ name: 'Cédula de Ciudadania', value: 'CC', selected: false },
    { name: 'Cédula de Extranjeria', value: 2, selected: false },
    { name: 'Pasaporte', value: 3, selected: false },
  ];
  constructor(private http: HttpClient, public fb: FormBuilder) {}

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    const newWidth = (event.target as Window).innerWidth;
    const newHeight = (event.target as Window).innerHeight;

    // Tu lógica para manejar el cambio de resolución
    console.log(`Nueva resolución: ${newWidth}x${newHeight}`);

    if (newWidth < 992) {
      this.resolucion_movil = true;
      console.log(this.resolucion_movil);
    }

    if (newWidth > 992) {
      this.resolucion_movil = false;
      console.log(this.resolucion_movil);
    }
  }

  ngOnInit(): void {
    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;

    if (initialWidth < 992) {
      this.resolucion_movil = true;
      console.log(this.resolucion_movil);
    }

    if (initialWidth > 992) {
      this.resolucion_movil = false;
      console.log(this.resolucion_movil);
    }
    this.fetchCountries();
    this.onSelectCountry();

    this.body = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],

      document_type: ['', Validators.required],
      document_number: ['', Validators.required],
      address: ['', Validators.required],
      document_front: ['', Validators.required],
      document_back: ['', Validators.required],
      referral_code: ['', Validators.required],
      phone: ['', Validators.required],
      reference_pay: ['', Validators.required], //juanito

      units: ['', Validators.required], // juanito
      investment: ['', Validators.required], // juanito
      type: ['', Validators.required], // tipo de pago juanito
      inversion_total: ['', Validators.required], // juanito
      meses: ['', Validators.required], // juanito
      valor_mes: ['', Validators.required], // juanito
    });

    this.patchForm();
  }

  public changeStep() {
    if (this.paso1) {
      this.paso1 = false;
      this.paso2 = true;
      return;
    }

    if (this.paso2) {
      this.paso2 = false;
      this.paso3 = true;
      return;
    }
  }

  fetchCountries() {
    const apiUrl = 'https://restcountries.com/v3.1/all';
    this.http.get<any[]>(apiUrl).subscribe(
      (countriesData) => {
        this.countries = countriesData.map((country) => country.name.common);
        this.countries.sort();
      },
      (error) => {
        console.error('Error al obtener los países:', error);
      }
    );
  }

  onSelectCountry(): void {
    if (this.selectedCountry) {
      this.http
        .get<any[]>(
          ` https://api.teleport.org/api/cities/?search=${this.selectedCountry}`
        )
        .subscribe(
          (res) => {
            console.log(res);
          },
          (error) => {
            console.error('Error al obtener las ciudades:', error);
          }
        );
    } else {
      this.cities = [];
    }
  }

  changeDues(event: number) {
    console.log(event);
  }

  private patchForm() {
    let first_name = localStorage.getItem('first_name');
    let last_name = localStorage.getItem('last_name');
    let document_type = localStorage.getItem('document_type');
    let document_number = localStorage.getItem('document_number');
    let phone = localStorage.getItem('phone');
    let address = localStorage.getItem('address');

    let obj = { name: 'Cédula de Ciudadania', value: 'CC', selected: true };
    this.opcionesSelect.unshift(obj);

    this.body.patchValue({ first_name });
    this.body.patchValue({ last_name });
    this.body.patchValue({ document_type });
    this.body.patchValue({ document_number });
    this.body.patchValue({ phone });
    this.body.patchValue({ address });

    console.log(this.body.value);
  }
}
