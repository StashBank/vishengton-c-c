import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { clientsRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(clientsRoutes)],
})
export class ClientsModule {}
