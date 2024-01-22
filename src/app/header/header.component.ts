import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { APIRequest } from '../Services/apiRequests.service';
import { WeatherResponse } from '../Models/WeatherResponse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    //properties
  weatherDetails: WeatherResponse;

  constructor(private api:APIRequest, private toast:HotToastService){};
  
  onButtonClick(name:string){
    this.api.getWeatherDetails(name).pipe(this.toast.observe({
      loading: 'Loading details..',
      success: 'Done!',
      error: 'Not Found'
    })).subscribe({
      next:(response: WeatherResponse) => {
        this.weatherDetails = response;

      },
      error(err){
        console.log(err)
      }
    });
  }
}
