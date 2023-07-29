import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../checkout/interfaces/Country.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestCountriesApiService {

  constructor(private http: HttpClient) { }

  private urlBase = "https://restcountries.com/v3.1"

  getCountryByName( name: string ){

    this.http.get<Country>( `${this.urlBase}/name/${name}` ).subscribe(
      (resp) => {return resp}
    )

  }

  getAllNameIddFlag(): Observable<Country[]>{

    return this.http.get<Country[]>( `${this.urlBase}/all` )

  }


}
