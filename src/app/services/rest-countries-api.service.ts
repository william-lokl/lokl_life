import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestCountriesApiService {

  constructor(private http: HttpClient) { }

  private urlBase = "https://restcountries.com/v3.1"

  getCountryByName( name: string ){

    this.http.get( `${this.urlBase}/name/${name}` ).subscribe(
      (resp) => {return resp}
    )

  }


}
