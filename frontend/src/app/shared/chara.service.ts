import { Injectable } from '@angular/core';
import { Chara } from './chara.model';
import { Attack } from './attack.model';
import { Classes } from './classes.model';
import { Containers } from './containers.model';
import { Effects } from './effects.model';
import { Features } from './features.model';
import { Items } from './items.model';
import { OtherProfs } from './other-profs.model';
import { Savethrows } from './savethrows.model';
import { SkillProfs } from './skill-profs.model';
import { SpellList } from './spell-list.model';
import { Spells } from './spells.model';

// chara service is responsible for:
// holding all character_ids (revisit storing in localstorage)
// holding all relevant data for the single active character
// calling socket hooks to push updated information to the back
// giving all components access to character information (solves data sharing between components)

// singleton service which holds all data for everything
@Injectable({providedIn: 'root' })
export class CharaService {

  AttackId: string;
  AttackSelected: Attack;
  AttackAll: Attack[];

  CharaId: string;
  CharaSelected: Chara;
  CharaAll: Chara[];

  ClassId: string;
  ClassSelected: Classes;
  ClassAll: Classes[];

  ContainerId: string;
  ContainerSelected: Containers;
  ContainerAll: Containers[];

  EffectId: string;
  EffectSelected: Effects;
  EffectAll: Effects[];

  FeatureId: string;
  FeatureSelected: Features;
  FeatureAll: Features[];

  ItemId: string;
  ItemSelected: Items;
  ItemAll: Items[];

  OtherprofId: string;
  OtherprofSelected: OtherProfs;
  OtherprofAll: OtherProfs[];

  SavethrowId: string;
  SavethrowSelected: Savethrows;
  SavethrowAll: Savethrows[];

  SkillprofId: string;
  SkillprofSelected: SkillProfs;
  SkillprofAll: SkillProfs[];

  SpelllistId: string;
  SpelllistSelected: SpellList;
  SpelllistAll: SpellList[];

  SpellId: string;
  SpellSelected: Spells;
  SpellAll: Spells[];


  constructor() { console.log('charaservice constructor called'); }


}
