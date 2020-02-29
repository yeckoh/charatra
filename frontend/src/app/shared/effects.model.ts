// effects modify stuff like stats, speed, AC, maxhealth

export class Effects {
  // tslint:disable: variable-name

  _id: string;
  target: string;

  value: string;
  addby: boolean;
  multiplyby: boolean;
  maxvalof: boolean;
  minvalof: boolean;
  basevalof: boolean;
}
