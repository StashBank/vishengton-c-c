import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { restApiClientRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(restApiClientRoutes)],
})
export class RestApiClientModule {}
