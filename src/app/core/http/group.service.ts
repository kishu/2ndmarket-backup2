import { first, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from '@app/core/http/firestore.service';
import { Group } from '@app/core/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends FirestoreService<Group> {

  constructor(protected afs: AngularFirestore) {
    super(afs, 'groups');
  }

  public getByEmail(email: string): Observable<Group | null> {
    const domain = email.substring(email.lastIndexOf('@') + 1);
    return this.query({
      where: [['domain', '==', domain]],
      limit: 1
    }).pipe(
      first(),
      map(groups => {
        if (groups.length > 0) {
          return groups[0];
        } else {
          return null;
        }
      })
    );
  }

}
