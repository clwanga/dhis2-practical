import { Component } from '@angular/core';
import { WeatherResponse } from '../Models/WeatherResponse';
import { APIRequest } from '../Services/apiRequests.service';
import { HotToastService } from '@ngneat/hot-toast';

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
      },
      complete() {
        
      }
    });
  }
}
