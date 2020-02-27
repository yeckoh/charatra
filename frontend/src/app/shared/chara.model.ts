/// define the chara class to match fields from mongodb
export class Chara {
  // tslint:disable: variable-name

  _id: string;
  current_hitpoints: number;
  stats: {
    stranth: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number,
    NatAC: number,
    total_hitpoints: number,
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
    race: {
      actualrace: string,
      listof_racefeatures: string,
      racespelllist: string
    },
    background: {
      actualbackground: string,
      listof_backgroundfeatures: [string]
    };
    ideals: string,
    bonds: string
  };

  skills: string;
  listof_characlass: [string];
  listof_charainventorylist: [string];
  listof_charamanualfeatures: [string];







  // _id: string;
  // presses: number;
  // // tslint:disable-next-line: variable-name
  // other_presses: number;

}
