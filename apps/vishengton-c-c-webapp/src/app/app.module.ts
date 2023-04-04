import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { FirebaseModule } from '@opavlovskyi/ui/firebase'
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    FirebaseModule.forRoot(environment.firebase)
  ],
  exports: [
    FirebaseModule
  ],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: '₴'}
  ]
})
export class AppModule {}