import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInFinishComponent } from './sign-in-finish/sign-in-finish.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'signin', component: SignInComponent },
      { path: 'signin-finish', component: SignInFinishComponent },
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
