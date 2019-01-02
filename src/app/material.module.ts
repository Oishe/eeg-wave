import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatToolbarModule, MatCardModule, MatIconModule],
  exports: [MatToolbarModule, MatCardModule, MatIconModule],
})
export class MaterialModule {}
