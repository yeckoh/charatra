import { Attack } from './attack.model';
import { Savethrows } from './savethrows.model';
import { ArmorMod } from './armor-mod.model';

export class Items {
  // tslint:disable: variable-name

  selected_color: string;

  _id: string;
  name: string;
  descript: string;
  count: number;
  weight: number;
  value: number;
  attunement: boolean;
  applyarmor: boolean;
  armormod: ArmorMod;
  // listof_itemsfeatures: [string];
  // listof_spells: [string];
  listof_attacks: [Attack];
  listof_savingthrows: [Savethrows];
}
