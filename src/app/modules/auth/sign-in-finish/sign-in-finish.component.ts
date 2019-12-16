import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/http';

@Component({
  selector: 'app-sign-in-finish',
  templateUrl: './sign-in-finish.component.html',
  styleUrls: ['./sign-in-finish.component.scss']
})
export class SignInFinishComponent implements OnInit {
  public signInResult: boolean = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.signInLinkToEmailResult()
      .then(r => {
        if (r && r.additionalUserInfo && r.additionalUserInfo.isNewUser) {
          this.router.navigate(['/']).then();
        } else if (r && r.user) {
          this.router.navigate(['/']).then();
        } else {
          this.signInResult = false;
        }
      });
  }

}
