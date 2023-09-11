import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserLogin } from 'src/app/interfaces/user-login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginFormGroup!: FormGroup;
  submittingForm: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  get email() {
    return this.loginFormGroup.get('email');
  }
  get password() {
    return this.loginFormGroup.get('password');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/');
      return;
    }

    this.loginFormGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
      ]),
    });
  }

  handleLogin(): void {
    this.submittingForm = true;
    if (this.loginFormGroup.valid) {
      const userLogin = new UserLogin();
      userLogin.email = this.email?.value;
      userLogin.password = this.password?.value;
      this.subscriptions.push(
        this.authService.login(userLogin).subscribe({
          next: (data: any) => {
            if(data.body.role != "ROLE_ADMIN") {
              window.alert('Only admin can access.');
              return;
            }
            const authToken = data.headers.get('Jwt-Token');
            this.authService.storeTokenInCache(authToken!);
            this.authService.storeAuthUserInCache(data.body!);
            this.router.navigateByUrl('/');
          },
          error: (errorResponse: HttpErrorResponse) => {
            window.alert('Incorrect credentials.');

          },
        })
      );
    }
  }
}
