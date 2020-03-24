import { SkillProfs } from './skill-profs.model';
import { Containers } from './containers.model';
import { Classes } from './classes.model';
import { Features } from './features.model';
import { SpellList } from './spell-list.model';

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
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number,
    baseAC: number,
    speed: number,
    level: number,
  };

  formuolis: {
    hitpoints: string,
    initiative: string,
    proficiency: string,
  };

  saves: {
    str: string,
    dex: string,
    con: string,
    int: string,
    wis: string,
    cha: string,
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
    race: string,
    background: string,
  };

  skills: SkillProfs;

  equipped_itemcontainer: Containers;
  inventory_container: Containers;
  extra_characontainer: Containers;
  // listof_characlass = [] as Classes[];
  // listof_spelllists = [] as SpellList[];
  listof_charafeatures = [] as Features[];
  chara_class: Classes;
  chara_spelllist: SpellList;

  special_stuff: {
    superiority_dice: number,
    expertise_dice: number,
    sorcery_points: number,
    ki_points: number,
    rage_dmg: number,
    other_name: string,
    other_number: number
  };

  constructor() {
    this.selected_color = 'nothing';
    this._id = 'none';

    this.current_hitpoints = 0;
    this.deathsaves = 0;

    this.stats = {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
      baseAC: 0,
      speed: 0,
      level: 0,
    };

    this.saves = {
      str: 'strMod',
      dex: 'dexMod',
      con: 'conMod',
      int: 'intMod',
      wis: 'wisMod',
      cha: 'chaMod'
    };

    this.formuolis = {
      hitpoints: '0',
      initiative: 'dexMod',
      proficiency: 'nope'
    };

    this.persona = {
      name: 'person',
      gender: 'string',
      description: 'string',
      personality: 'string',
      ideals: 'string',
      bonds: 'string',
      race: 'string',
      background: 'string',
    };

    this.skills = new SkillProfs();

    this.equipped_itemcontainer = new Containers();
    this.inventory_container = new Containers();
    this.extra_characontainer = new Containers();
    // this.listof_characlass = [] as Classes[];
    // this.listof_spelllists = [] as SpellList[];
    this.listof_charafeatures = [] as Features[];
    this.chara_class = new Classes();
    this.chara_spelllist = new SpellList();

    this.special_stuff = {
      superiority_dice: 0,
      expertise_dice: 0,
      sorcery_points: 0,
      ki_points: 0,
      rage_dmg: 0,
      other_name: 'none',
      other_number: 0
    };
  }
}

