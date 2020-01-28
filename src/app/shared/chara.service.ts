import { Injectable } from '@angular/core';

// do we need these
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Chara } from './chara.model';

@Injectable()
export class CharaService {

  selectedChara: Chara;
  allCharas: Chara[];

}
