import { EventEmitter, Injectable, Output } from '@angular/core';
import { MapI, Response } from '../interfaces/map';

@Injectable({
  providedIn: 'root'
})
export class BriggeService {
  @Output() mapToForm: EventEmitter<MapI>= new EventEmitter( )
  @Output() formToMap: EventEmitter<Response>= new EventEmitter( )
  @Output() sendTargetToForm: EventEmitter<any>= new EventEmitter( )
  @Output() sendTargetToMap: EventEmitter<any>= new EventEmitter( )

  constructor() { }

}
