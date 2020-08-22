import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog'
import { LogInErrorDialogComponent } from '../log-in-error-dialog/log-in-error-dialog.component';


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
  invalidCredentials = false;

  get form() {return this.loginForm.controls;}

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog
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

  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  onSubmit(event) {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(
      this.form.username.value, this.form.password.value
    ).pipe(first()).subscribe(data => {
        this.router.navigate(['/now-playing']);        
      },
      error => {
          this.error = error;
          alert("Credentials not found. Sign-up");
      }
    );

  }

}
