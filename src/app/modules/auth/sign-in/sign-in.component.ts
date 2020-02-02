import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  private submitting = false;
  public email: string;
  public submitted = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  reset() {
    this.email = '';
    this.submitted = false;
  }

  submit() {
    if (!this.submitting) {
      this.submitting = true;
      this.authService.signInLinkToEmail(this.email)
        .then(() => this.submitted = true)
        .catch(err => alert(err))
        .then(() => this.submitting = false);
    }
  }

}
