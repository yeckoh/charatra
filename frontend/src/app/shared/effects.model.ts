// effects modify stuff like stats, speed, AC, maxhealth

export class Effects {
  // tslint:disable: variable-name

  _id: string;
  targetstat: string; // from a list of specific choices

  value: string; // formula bar
  addby: boolean;
  multiplyby: boolean;
  maxvalof: boolean;
  minvalof: boolean;
  basevalof: boolean;
}
