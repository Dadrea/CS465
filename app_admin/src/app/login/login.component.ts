import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public formErrorMsg: string = 'All fields are required, please try again';
  public formInvalid: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onLoginSubmit(): void {
    if (this.loginForm.invalid) {
        this.formInvalid = true; // Show error message
    } else {
        this.formInvalid = false; // Hide error message
        this.doLogin();
    }
}

  private doLogin(): void {
    this.authenticationService.login(this.loginForm.value)
      .then(() => this.router.navigateByUrl('list-trips'))
      .catch((message) => {
        this.formErrorMsg = message;
        this.formInvalid = true;
      });
  }
}
