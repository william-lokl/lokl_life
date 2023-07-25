import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  exports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
})
export class MaterialModule {}
