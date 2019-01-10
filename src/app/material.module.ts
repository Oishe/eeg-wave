import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatSliderModule,
  MatRadioModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    MatInputModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    MatInputModule
  ],
})
export class MaterialModule {}
