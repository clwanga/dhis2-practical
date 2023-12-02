import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WeatherResponse } from "../Models/WeatherResponse";

@Injectable({
    providedIn: 'root'
  })
export class APIRequest{
    
    baseUrl:string = "https://api.openweathermap.org";

    constructor(private http: HttpClient){} 

    getWeatherDetails(cityName:string): Observable<WeatherResponse>{
      const url = `${this.baseUrl}/data/2.5/weather?q=${cityName}&appid=${this.apiKey}`;
      return this.http.get<WeatherResponse>(url);
    }
}