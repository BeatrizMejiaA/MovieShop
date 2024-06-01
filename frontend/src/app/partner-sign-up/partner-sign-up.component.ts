import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonDatetime } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-partner-sign-up',
  templateUrl: './partner-sign-up.component.html',
  styleUrls: ['./partner-sign-up.component.scss'],
})
export class PartnerSignUpComponent implements OnInit {
  @ViewChild('birthDatePicker') birthDatePicker!: IonDatetime;
  partnerForm: FormGroup;
  errorMessage: string = '';
  birthDate: string = '';
  birthDateString: string = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.partnerForm = this.fb.group(
      {
        id: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        middleName: [''],
        lastName: ['', Validators.required],
        mobile: ['', Validators.required],
        emailPaypal: ['', [Validators.required, Validators.email]],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
        address1: ['', Validators.required],
        birthDate: [''],
        photo: ['NA'],
        password: ['', [Validators.required, Validators.minLength(3)]],
        repeatpass: ['', [Validators.required, Validators.minLength(3)]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit() {}

  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['repeatpass'].value
      ? null
      : { mismatch: true };
  }

  openDatePicker() {
    this.birthDatePicker.confirm();
  }

  onDateChange(event: any) {
    this.birthDate = event.detail.value;
    this.birthDateString = new Date(this.birthDate).toLocaleDateString();
    this.partnerForm.patchValue({ birthDate: this.birthDate });
  }

  onSubmit() {
    if (this.partnerForm.valid) {
      // Call the API to submit the form
      this.http
        .post<any>(
          'https://2wskjly0pd.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/merchants',
          this.partnerForm.value
        )
        .subscribe(
          (response) => {
            console.log('API Response sign up partner:', response);
            this.router.navigate(['/']);
          },
          (error) => {
            // Handle API error
            this.errorMessage =
              'There was an error processing your request. Please try again later.';
          }
        );
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
