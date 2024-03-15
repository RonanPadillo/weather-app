import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  apiKey = "9511fcc71000039ade0c02b80c235b9d";
  apiUrl = "https://api.openweathermap.org/data/2.5/forecast?"

  constructor(
    private http: HttpClient,
  ) { }

  getWeather(city: any) {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q='+ city +'&APPID=' + this.apiKey + "&units=metric");
  }

  getForecast(city: any) {
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?q='+ city +'&APPID=' + this.apiKey + "&units=metric");
  }
  
}
