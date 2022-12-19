import { Component, OnInit } from '@angular/core';
import { MapI } from '../interfaces/map';
import { BriggeService } from '../services/brigge.service';
import { MapsService } from '../services/maps.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(private bridge: BriggeService, private mapService: MapsService) {}
  target:any
  loading:boolean=false
  locationForm: MapI = {
    id: 0,
    latitude: 0,
    longitude: 0,
  };

  ngOnInit(): void {
    this.bridge.mapToForm.subscribe((data) => {
      this.locationForm.latitude = data.latitude;
      this.locationForm.longitude = data.longitude;
      this.locationForm.id = data.id;
    });

    this.bridge.sendTargetToForm.subscribe((data)=>{
      this.target = data
    })
  }

  onSubmit() {
    const point: MapI = {
      id: this.locationForm.id,
      longitude: Number(this.locationForm.longitude),
      latitude: Number(this.locationForm.latitude),
    };

    if (point.id) {
      this.updatePoint(point);
    } else {
      this.savePoint(point);
    }
    this.resetFields()
  }

  resetFields() {
    this.locationForm = {
      id: undefined,
      latitude: 0,
      longitude: 0,
    };
  }

  savePoint(point: MapI) {
    this.loading = true
    this.mapService.createLocation(point).subscribe((response) => {
      this.bridge.formToMap.emit(response);
      this.loading = false
      this.bridge.sendTargetToMap.emit(this.target)
    });
  }

  updatePoint(point: MapI) {
    this.loading = true
    this.mapService.updateLocation(point).subscribe((response) => {
      this.bridge.formToMap.emit(response);
      this.loading = false
      this.bridge.sendTargetToMap.emit(this.target)
    });
  }
}
