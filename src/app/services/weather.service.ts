import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { Observable, catchError, forkJoin, map, of, switchMap, throwError } from 'rxjs';
import { CACHING_ENABLED } from '../core/cache.interceptor';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  apiKey = "9511fcc71000039ade0c02b80c235b9d";
  apiUrl = "https://api.openweathermap.org/data/2.5/forecast?"

  constructor(
    private http: HttpClient,
  ) { }
  

  getWeather(city: any, isDegree: any) {

    let unit = "metric";

    if( typeof city == 'undefined' || city == null ){
      city = '';
    }

    unit = !isDegree ? "metric" : "imperial"; 
 
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q='+ city +'&APPID=' + this.apiKey + "&units=" + unit, 
    {context: new HttpContext().set(CACHING_ENABLED, false),});
  }

  getForecast(city: any, isDegree: any) {

    let unit = "metric";

    if( typeof city == 'undefined' || city == null ){
      city = '';
    }
    
    unit = !isDegree ? "metric" : "imperial"; 

    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?q='+ city +'&APPID=' + this.apiKey + "&units=" + unit,
    {context: new HttpContext().set(CACHING_ENABLED, false),});
  }
  
}
