import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from "../forecast/forecast.component";
import { FormsModule, NgForm,  } from '@angular/forms';
import { forkJoin} from 'rxjs';

@Component({
    selector: 'app-weather',
    standalone: true,
    templateUrl: './weather.component.html',
    styleUrl: './weather.component.scss',
    imports: [CommonModule, ForecastComponent, FormsModule,]
})

export class WeatherComponent implements OnInit{

  city = 'London';
  cityWeather: any;
  cityForecast: any;
  location: any;
  weekForecastData: any = [];
  dtTimezone: any;
  imageUrl: any;
  cityName: any;
  error: any;
  isError : boolean = false;
  isDegree: boolean = false;
  temp: any;

  constructor(
    private weatherService: WeatherService,
  ){}

  ngOnInit(): void {

     this.weatherForecast(this.city, this.isDegree);
  }

  degree() {

    const city = typeof this.cityName == "undefined" ? this.city : this.cityName;
    this.weatherForecast(city, this.isDegree)
  }
  
  onSubmit(f: NgForm) {

    if(f.value.cityName != "") {
      this.cityName = f.value.cityName
      this.weatherForecast(f.value.cityName, this.isDegree);
      this.error = "";
    } else {
      this.error = "Please search city name!";
    }
  }

  weatherForecast(name: any, degree: any) {
    
    if(typeof name == "undefined") {
      return
    }

    const weather  = this.weatherService.getWeather(name, degree);
    const forecast = this.weatherService.getForecast(name, degree);

    forkJoin([weather, forecast]).subscribe({
      next: (res) => {  
        this.temp = this.isDegree ? 'F' : 'C';
        this.cityWeather      = res[0];
        this.dtTimezone       = this.getLongFormatUnixTime( this.cityWeather);
        this.imageUrl         = 'http://openweathermap.org/img/wn/'+ this.cityWeather.weather[0].icon +"@4x.png";
        this.weekForecastData = res[1];
        this.weekForecastData = this.weekForecastData.list
        this.error            = "";
      },
      error:((err) => {
      
        if(err.error.cod == "404") {
         
          this.error = "City not found " + this.cityName;
        }
        throw err;
      })
    });
  }

  //format date and timezone for the current city
  getLongFormatUnixTime(weatherData: any) {

    const epochTime = weatherData.dt;
    const utcOffsetSeconds = weatherData.timezone;

    const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return this.formatUnixTime(epochTime, utcOffsetSeconds, options);
  }

   //format date and timezone for the current city
  formatUnixTime(epochTime: any, utcOffsetSeconds: any, options={}) {
  
    const date = new Date((epochTime + utcOffsetSeconds) * 1000);
    return date.toLocaleTimeString([], { timeZone: 'UTC', ...options });
  }
  
}
