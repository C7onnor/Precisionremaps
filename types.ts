export enum PageView {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  LOOKUP = 'LOOKUP',
  CONTACT = 'CONTACT',
  DEALS = 'DEALS'
}

export interface VehicleStats {
  originalBhp: number;
  tunedBhp: number;
  originalTorque: number;
  tunedTorque: number;
  vehicleName: string;
  engine: string;
}

export interface NavItem {
  label: string;
  view: PageView;
}