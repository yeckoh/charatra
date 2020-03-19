import { Attack } from './attack.model';
import { Savethrows } from './savethrows.model';
import { OtherProfs } from './other-profs.model';

export class Features {
  // tslint:disable: variable-name

  selected_color: string;
  feature_category: number; // 0-3 ? see: chara.model feature_category_names

  _id: string;
  title: string;
  descript: string;
  uses: number;
  uses_left: number;
  toggleable: boolean;
  is_enabled: boolean;
  listof_atks: [Attack];
  listof_saves: [Savethrows];
  // listof_featureprofs: [OtherProfs];
  // listof_effects: [string];
}
