import { inject } from '@angular/core';
import { getFirestore, collection, CollectionReference, addDoc, getDocs } from 'firebase/firestore';

import { FIRESTORE } from './injection.tokens';

export class FirebaseDbService {
  private readonly firestore = inject(FIRESTORE);

  private get database() {
    return getFirestore(this.firestore.app)
  }

  collection(path: string) {
    return collection(this.database, path)
  }

  add(reference: CollectionReference, value: unknown) {
    return addDoc(reference, value)
  }

  get(reference: CollectionReference) {
    return getDocs(reference).then(r => r.docs.map(doc => doc.data()))
  }
  
}