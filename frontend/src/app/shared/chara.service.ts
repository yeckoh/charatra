import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chara } from './chara.model';

// chara service is responsible for:
// holding all character_ids (revisit storing in localstorage)
// holding all relevant data for the single active character
// calling socket hooks to push updated information to the back
// giving all components access to character information (solves data sharing between components)

// default
// @Injectable()

// singleton service
@Injectable({providedIn: 'root', })
export class CharaService {

  desiredId: string;
  selectedChara: Chara;
  allCharas: Chara[];

  constructor() { }


}
