import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regForm: FormGroup;
  formSubmitted = false;
  returnUrl: string;
  error: '';
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  // convenience
  get f() {return this.regForm.controls;}

  buildForm() {
    this.regForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    })
  }

  onSubmit(event) {
    this.formSubmitted = true;

    if (this.regForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.f.email.value, this.f.password.value, this.f.firstName.value, this.f.lastName.value)
      .pipe(first())
      .subscribe(date => {
          this.router.navigate(['/login']);
        },
        error => {
          this.error = error;
          alert("Registration not successfull");
          this.loading = false;
        });
  }
}
