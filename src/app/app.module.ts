import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MymatModule } from './mymat/mymat.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MycComponent } from './myc/myc.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CharaComponent } from './chara/chara.component';
// formsModule is getting imported in mymat importer component

@NgModule({
  declarations: [
    AppComponent,
    MycComponent,
    SidenavComponent,
    CharaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MymatModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
