import { Attack } from './attack.model';
import { Savethrows } from './savethrows.model';

export class Spells {
  // tslint:disable: variable-name

  selected_color: string;

  _id: string;
  spellname: string;
  descript: string;
  lvl: number;
  cast_time: string;
  range: string;
  is_verbal_component: boolean;
  is_somatic_component: boolean;
  is_concentration: boolean;
  is_ritual: boolean;
  duration: string;
  listof_spellattacks: Attack;
  listof_spellsaves: Savethrows;
  // listof_spellsfeatures: [string];
}
