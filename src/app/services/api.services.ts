import {Injectable } from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';


@Injectable()


export class Api {
    constructor( private http: HttpClient){}
   


  private _restaurants = new BehaviorSubject([]);
  restaurants = this._restaurants.asObservable();
    
    getRestaurants = (input, lat, long) => {
        // return this.http.get('https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=restaurants&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours&locationbias=circle:2000@42.3314,-83.0458&minResults=20&key=AIzaSyAZ1xMLoKB963qGBjIuAtqLokfOIc-IpxQ');
        return this.http.get(`https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+${input}?&location=${lat},${long}&radius=2000&key=AIzaSyAZ1xMLoKB963qGBjIuAtqLokfOIc-IpxQ`);
    }

    getLocationAPI = () => {
        return this.http.get('https://ipapi.co/json/');
    }

    updateRest = (data) => {
        this._restaurants.next(data);
    }

}