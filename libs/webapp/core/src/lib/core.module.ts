import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
  exports: [modules]
})
export class CoreModule {}
