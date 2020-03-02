export class Features {
  // tslint:disable: variable-name

  selected_color: string;
  feature_category: number; // 0-3 ? see: chara.model feature_category_names

  _id: string;
  descript: string;
  uses: number;
  uses_left: number;
  toggleable: boolean;
  is_enabled: boolean;
  listof_atks: [string];
  listof_saves: [string];
  listof_featureprofs: [string];
}
