import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '@app/core/model';
import { AuthService, GroupService } from '@app/core/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  private groups: Observable<Group[]>;
  private submitting = false;
  public account: string;
  public domain: string;
  public submitted = false;

  constructor(
    private authService: AuthService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.groups = this.groupService.getAll([['domain', 'asc']]);
  }

  reset() {
    this.account = '';
    this.domain = '';
    this.submitted = false;
  }

  submit() {
    if (!this.submitting) {
      this.submitting = true;
      const email = `${this.account}@${this.domain}`;
      this.authService.signInLinkToEmail(email)
        .then(() => this.submitted = true)
        .catch(err => alert(err))
        .then(() => this.submitting = false);
    }
  }

}
