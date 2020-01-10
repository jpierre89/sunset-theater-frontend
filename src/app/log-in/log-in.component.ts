import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  formSubmitted = false;
  returnUrl: string;
  error: '';
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    // redirect if user already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/now-playing']);
    }
  }

  ngOnInit() {
    this.buildForm();
    // get return url from route param or defaults to root url
    this.returnUrl = '/';
  }

  // convenience
  get f() {return this.loginForm.controls;}

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }


  onSubmit(event) {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    // use service to attempt login with form's username and password
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(date => {
          this.router.navigate(['/now-playing']);
        },
        error => {
          this.error = error;
          alert("email or password not valid");
          this.loading = false;
        });
  }

}
