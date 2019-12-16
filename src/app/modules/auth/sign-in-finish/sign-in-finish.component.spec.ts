import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInFinishComponent } from './sign-in-finish.component';

describe('SignInResultComponent', () => {
  let component: SignInFinishComponent;
  let fixture: ComponentFixture<SignInFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
