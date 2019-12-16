import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from '@app/core/http/firestore.service';
import { User } from '@app/core/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends FirestoreService<User> {

  constructor(protected afs: AngularFirestore) {
    super(afs, 'users');
  }
}
