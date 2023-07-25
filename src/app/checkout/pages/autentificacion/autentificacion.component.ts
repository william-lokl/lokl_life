import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomSelectElement } from '../../interfaces/customSelectElement.interface';

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

  public opcionesSelect: CustomSelectElement[] = [
    { name: 'Cédula de Ciudadania', value: 1, selected: true },
    { name: 'Cédula de Extranjeria', value: 2, selected: false },
    { name: 'Pasaporte', value: 3, selected: false },
  ];
  constructor(private http: HttpClient) {}

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
}
