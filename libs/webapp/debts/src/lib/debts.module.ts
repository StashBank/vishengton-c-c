import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { debtsRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(debtsRoutes)],
})
export class DebtsModule {}
