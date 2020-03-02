/// define the chara class to match fields from mongodb
export class Chara {
  // tslint:disable: variable-name

  selected_color: string;
  feature_category0: string; // user defined feature separation names
  feature_category1: string;
  feature_category2: string;
  feature_category3: string;

  _id: string;

  current_hitpoints: number;
  deathsaves: number;

  stats: {
    stranth: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number,
    NatAC: number,
    total_AC: number,
    total_speed: number,
    total_hitpoints: number,
    // total_hitdice: number, <-- potentially separate into its own model
    total_level: number,
    total_proficiencybonus: number,
    total_casterlevel: number
  };

  spellslots: {
    first: number,
    secnd: number,
    third: number,
    fourth: number,
    fifth: number,
    sixth: number,
    seventh: number,
    eightth: number,
    ninth: number
  };

  persona: {
    name: string,
    gender: string,
    description: string,
    personality: string,
    ideals: string,
    bonds: string,
    race: {
      actualrace: string,
      listof_racefeatures: string,
      racespelllist: string
    },
    background: {
      actualbackground: string,
      listof_backgroundfeatures: [string]
    }
  };

  skills: string;
  listof_characlass: [string];
  listof_charainventorylist: [string];
  listof_charamanualfeatures: [string];


  special_stuff: {
    superiority_dice: number,
    expertise_dice: number,
    sorcery_points: number,
    ki_points: number,
    rage_dmg: number,
    other_name: string,
    other_number: number
  };





  // _id: string;
  // presses: number;
  // // tslint:disable-next-line: variable-name
  // other_presses: number;

}
