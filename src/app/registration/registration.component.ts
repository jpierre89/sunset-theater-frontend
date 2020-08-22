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
  formSubmitted: boolean = false;
  returnUrl: string;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  get form() {return this.regForm.controls;}

  buildForm() {
    this.regForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      firstName: [null],
    })
  }

  onSubmit(event) {
    this.formSubmitted = true;

    if (this.regForm.invalid) {
      return;
    }

    this.authenticationService.register(this.form.username.value,this.form.password.value,this.form.firstName.value)
    .pipe(first()).subscribe(date => {
          this.router.navigate(['/login']);
      },
      error => {
        this.error = error;
        alert("Username is taken");
      }
    );
  }
}
