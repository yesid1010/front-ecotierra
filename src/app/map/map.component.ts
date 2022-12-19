import { Component, AfterViewInit, OnInit } from '@angular/core';
import {
  icon,
  Map,
  tileLayer,
  LeafletMouseEvent,
  marker,
} from 'leaflet';
import { MapI } from '../interfaces/map';
import { BriggeService } from '../services/brigge.service';
import { MapsService } from '../services/maps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnInit {
  constructor(private mapService: MapsService, private bridge: BriggeService) {}

  private map!: Map;
  private points: MapI[] = [];
  private markerIcon = icon({
    iconUrl: './assets/icons/marker.png',
    iconSize: [20, 35],
  });

  ngAfterViewInit(): void {
    this.initMap();
    this.loadPoints();
  }

  ngOnInit(): void {
    this.bridge.formToMap.subscribe((data) => {
      this.createMarket(data.data.latitude,data.data.longitude,Number(data.data.id))
    });

    this.bridge.sendTargetToMap.subscribe((target)=>{
      this.map.removeLayer(target)
    })
  }

  private initMap(): void {
    this.map = new Map('map').setView([10.644654, -75.055099], 4);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 2,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.map.on('click', (e: LeafletMouseEvent) => this.onMapClick(e));
  }

  loadPoints() {
    this.mapService.getLocations().subscribe((response) => {
      this.points = response;
      this.points.map((point) => {
        this.createMarket(point.latitude, point.longitude,Number(point.id));
      });
    });
  }

  createMarket(lat: number, lng: number,id?:number) {
    //@ts-ignore
    marker([lat, lng], { icon: this.markerIcon , id, draggable:true })
      .addTo(this.map)
      .on('click', (e: LeafletMouseEvent) => this.onMarkerClick(e))
      .on('moveend',(e: any)=>  this.onMoveClick(e))
  }
  
  onMarkerClick(e: LeafletMouseEvent) {
    const {options:{id}} = e.sourceTarget
    const point: MapI = {
      id,
      longitude: e.latlng.lng,
      latitude: e.latlng.lat
    }
    this.bridge.mapToForm.emit(point)
    this.bridge.sendTargetToForm.emit(e.target)
  }

  onMoveClick(e:any){
    const coord = e.target._latlng
    const {id} = e.target.options
    const point: MapI = {
      id,
      longitude: coord.lng,
      latitude: coord.lat
    }
    this.bridge.mapToForm.emit(point)
    this.bridge.sendTargetToForm.emit(e.target)
  }

  onMapClick(e: LeafletMouseEvent) {
    const point: MapI = {
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
    };
    this.bridge.mapToForm.emit(point);
  }
}
