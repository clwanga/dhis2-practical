import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { APIRequest } from '../Services/apiRequests.service';
import { WeatherResponse } from '../Models/WeatherResponse';
import { JokesResponse } from '../Models/JokesResponse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
    //properties
  weatherDetails: WeatherResponse;
  jokeApiResponse: JokesResponse;
  showJokes: boolean = true;

  //constructor
  constructor(private api:APIRequest, private toast:HotToastService){};

  //methods
  ngOnInit(){
    this.api.getRandomJoke().subscribe({
      next:(response: JokesResponse)=>{
        this.jokeApiResponse = response;
      },
      error(){
        this.toast.create('Error fetching Joke!','danger');
      }
    });
  }
  
  onButtonClick(name:string){
    this.showJokes =false;

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
