import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { MymatModule } from './mymat/mymat.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CharaComponent } from './chara/chara.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
// formsModule is getting imported in mymat importer component

import { ValidateService } from './shared/validate.service';
import { AuthService } from './shared/auth.service';
// import {FlashMessagesModule} from 'angular2-flash-messages';

import { TabOverviewComponent } from './chara/tabs/tab-overview/tab-overview.component';
import { TabFeatureComponent } from './chara/tabs/tab-feature/tab-feature.component';
import { TabInventoryComponent } from './chara/tabs/tab-inventory/tab-inventory.component';
import { TabSpellsComponent } from './chara/tabs/tab-spells/tab-spells.component';
import { TabPersonaComponent } from './chara/tabs/tab-persona/tab-persona.component';
import { DialogNewcharaComponent } from './dialogs/dialog-newchara/dialog-newchara.component';
// import { SecretSocketComponent } from './secret-socket/secret-socket.component';
import { DialogFeatureComponent } from './dialogs/dialog-feature/dialog-feature.component';
import { CharaService } from './shared/chara.service';
import { ModifierPipe } from './pipes/modifier.pipe';
import { DialogStatComponent } from './dialogs/dialog-stat/dialog-stat.component';
import { DialogAttackComponent } from './dialogs/dialog-attack/dialog-attack.component';
import { DialogItemComponent } from './dialogs/dialog-item/dialog-item.component';
import { DialogSavingthrowComponent } from './dialogs/dialog-savingthrow/dialog-savingthrow.component';
import { DialogPersonaComponent } from './dialogs/dialog-persona/dialog-persona.component';
import { DialogClassesComponent } from './dialogs/dialog-classes/dialog-classes.component';
import { DialogSpellComponent } from './dialogs/dialog-spell/dialog-spell.component';

const appRoutes: Routes = [
  { path: '', component: SigninComponent }, // TODO: make a splashpage
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: ':_id' , component: CharaComponent }
 ];

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    CharaComponent,
    SigninComponent,
    HomeComponent,
    SignupComponent,
    TabOverviewComponent,
    TabFeatureComponent,
    TabInventoryComponent,
    TabSpellsComponent,
    TabPersonaComponent,
    DialogNewcharaComponent,
//    SecretSocketComponent,
    DialogFeatureComponent,
    ModifierPipe,
    DialogStatComponent,
    DialogAttackComponent,
    DialogItemComponent,
    DialogSavingthrowComponent,
    DialogPersonaComponent,
    DialogClassesComponent,
    DialogSpellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MymatModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
//    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, CharaService, ModifierPipe],
  entryComponents:
    [ DialogNewcharaComponent,
      DialogFeatureComponent,
      DialogStatComponent,
      DialogAttackComponent,
      DialogSavingthrowComponent,
      DialogItemComponent,
      DialogPersonaComponent,
      DialogClassesComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
