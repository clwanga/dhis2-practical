import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WeatherResponse } from "../Models/WeatherResponse";
import { JokesResponse } from "../Models/JokesResponse";

@Injectable({
    providedIn: 'root'
  })
export class APIRequest{
    public apiKey:string  = "70c8b3004ccba1ac189e8d627581ced1";
    baseUrl:string = "https://api.openweathermap.org";
    baseUrlJokesApi:string = "https://official-joke-api.appspot.com";

    constructor(private http: HttpClient){} 

    getWeatherDetails(cityName:string): Observable<WeatherResponse>{
      const url = `${this.baseUrl}/data/2.5/weather?q=${cityName}&appid=${this.apiKey}`;
      return this.http.get<WeatherResponse>(url);
    }

    getRandomJoke(): Observable<JokesResponse>{
      const endpoint = `${this.baseUrlJokesApi}/random_joke`;

      return this.http.get<JokesResponse>(endpoint);
    }
}