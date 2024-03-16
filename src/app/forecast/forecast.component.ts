import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, input } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent implements OnInit, DoCheck {
  @Input() data : any = [];
  @Input() city : any;

  cityWeather     : any;
  cityForecast    : any;
  weekForecastData : any = [];

  constructor(
    private weatherService : WeatherService,
  ){}

  ngOnInit(): void {

  }

  ngDoCheck() {
    this.weekForecastData = [];
    this.weekForecast(this.data)
  }

  weekForecast(data: any) {

    for(let i = 0; i < data.length; i = i + 1){

      this.weekForecastData.push(data[i])
    }
  }
}

