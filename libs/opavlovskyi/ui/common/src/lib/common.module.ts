import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { MaterialModule } from './mat.module';

const modules = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  MatNativeDateModule,
  ReactiveFormsModule,
  MaterialModule,
];

@NgModule({
  imports: [modules],
  exports: [modules],
})
export class OPCommonModule {}