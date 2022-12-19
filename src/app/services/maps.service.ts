import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { MapI, Response } from '../interfaces/map';
@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private api_url = 'http://api-ecotierra.test/api/locations';
  constructor(private http: HttpClient) { }

  createLocation(location:MapI){
    return this.http.post<Response>(`${this.api_url}`,location)
  }

  getLocations(){
    return this.http.get<MapI[]>(`${this.api_url}`)
  }

  getLocation(id: number){
    return this.http.get(`${this.api_url}/${id}`)
  }

  updateLocation(location:MapI){
    return this.http.put<Response>(`${this.api_url}/${location.id}`,location)
  }

  deleteLocation(id: number){
    return this.http.delete(`${this.api_url}/${id}`)
  }
}
