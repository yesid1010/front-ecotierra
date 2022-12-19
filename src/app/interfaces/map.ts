export interface MapI {
  id?: number | null;
  longitude: number;
  latitude: number;
}

export interface Response {
  status: string;
  message: string;
  data: MapI;
}