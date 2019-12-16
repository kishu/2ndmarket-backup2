import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@app/core/model/user';
import { Group } from '@app/core/model';
import { GroupService } from '@app/core/http/group.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAdmin: boolean;
  private _user: User;
  private _group: Group;

  get isAdmin() { return this._isAdmin; }
  get currentUser(): User { return this._user; }
  get currentGroup(): Group { return this._group; }

  constructor(
    private afAuth: AngularFireAuth,
    private groupService: GroupService
  ) {
    this.user.subscribe(u => this._user = u);
    this.user.pipe(
      filter(u => !!u),
      switchMap(u => this.groupService.getByEmail(u.email))
    ).subscribe(g => this._group = g);
    this.afAuth.idTokenResult.subscribe(r => {
      if ( r && r.claims && r.claims.admin) {
        this._isAdmin = r.claims.admin;
      } else {
        this._isAdmin = false;
      }
    });
  }

  get user(): Observable<User> {
    return this.afAuth.user.pipe(
      map(u => {
        if (u) {
          const { uid, displayName, photoURL, email } = u;
          return { id: uid, displayName, photoURL, email };
        } else {
          return null;
        }
      })
    );
  }

  signInLinkToEmail(email: string) {
    // https://firebase.google.com/docs/auth/web/email-link-auth
    const actionCodeSettings = {
      url: window.location.origin + '/signin-finish',
      handleCodeInApp: true
    };
    return this.afAuth.auth.sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => window.localStorage.setItem('emailForSignIn', email))
      .catch(err => alert(err));
  }

  signInLinkToEmailResult() {
    const isSignInWithEmilLink = this.afAuth.auth.isSignInWithEmailLink(window.location.href);
    const email = window.localStorage.getItem('emailForSignIn');
    if (isSignInWithEmilLink && email) {
      window.localStorage.removeItem('emailForSignIn');
      return this.afAuth.auth.signInWithEmailLink(email, window.location.href)
        .then(r => r)
        .catch(err => alert(err));
    } else {
      return Promise.resolve(null);
    }
  }
}
