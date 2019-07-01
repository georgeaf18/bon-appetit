import { Component, OnInit } from '@angular/core';
import { Api} from '../services/api.services';

  interface Results {
    name: string;
    formatted_address: string;
  }

  interface ApiData {
    results: Results[];
  }

  interface LocationData {
    latitude: number;
    longitude: number;
  }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lat:number;
  long: number;
  restaurants: Results[];
  rest: any;
  show: boolean = false;
  input: string = '';
  priceRangeNum: number;
  priceRange: string;
  constructor(private api: Api) { }

  ngOnInit() {
    this.getLocation();
  }






  getLocation = () => {

    this.api.getLocationAPI().subscribe( (data:LocationData) => {
      this.lat = data.latitude;
      this.long = data.longitude;
    });
    
  }
  
  
  
  random = (length) => {
    return Math.floor(Math.random() * length)
  }
  
  displayRest = () => {
    this.rest = this.restaurants[this.random(this.restaurants.length)];
    this.priceRangeNum = this.rest.price_level;
    this.setMoneyRange();
    console.log(this.rest);
  }
  
  
  
  filterRestaurants = () => {
    
      console.log(this.lat)

      this.api.getRestaurants(this.input, this.lat, this.long).subscribe((data:ApiData) => {
        this.restaurants = data.results;
        console.log(data)
        console.log("TCL: HomeComponent -> filterRestaurants -> this.restaurants", this.restaurants)
        this.show = true;
        this.displayRest();
      }, error => {
        console.log(error.message)
      });
    
  }

  setMoneyRange = () => {
    if (this.priceRangeNum === 1){
      this.priceRange = '$';
    } else if (this.priceRangeNum === 2){
      this.priceRange = '$$';
    } else if (this.priceRangeNum === 3){
      this.priceRange = '$$$';
    } else if (this.priceRangeNum === 4){
      this.priceRange = '$$$$';
    }
  }


  

}
