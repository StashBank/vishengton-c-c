import { NgModule } from '@angular/core';
import { FirebaseModule } from '@opavlovskyi/ui/firebase'
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    FirebaseModule.forRoot(environment.firebase)
  ],
  exports: [
    FirebaseModule
  ]
})
export class AppModule {}