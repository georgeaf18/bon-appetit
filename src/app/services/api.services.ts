import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class Api {
    constructor(private http: HttpClient) { }

    private _restaurants = new BehaviorSubject([]);
    restaurants = this._restaurants.asObservable();

    getRestaurants = (input, lat, long) => {
        const URL = `${environment.api}/restaurants/${input}/${lat}/${long}`;
        return this.http.get(URL);
    }

    getLocationAPI = () => {
        return this.http.get('https://ipapi.co/json/');
    }

    updateRest = (data) => {
        this._restaurants.next(data);
    }

}