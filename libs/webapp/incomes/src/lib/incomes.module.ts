import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { incomesRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(incomesRoutes)],
})
export class IncomesModule {}
