import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
// import { MatInputModule } from '@angular/material';

const mymatComponents = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatTabsModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatDialogModule,

  FormsModule
];

@NgModule({
  imports: [mymatComponents],
  exports: [mymatComponents]
})
export class MymatModule { }
