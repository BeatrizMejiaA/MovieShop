import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-prompt',
  templateUrl: './login-prompt.component.html',
  styleUrls: ['./login-prompt.component.scss'],
})
export class LoginPromptComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  loginAsUser() {
    // Navigate to the user login page
    this.router.navigate(['/login']);
  }

  loginAsPartner() {
    // Navigate to the partner login page
    this.router.navigate(['partner-sign-up']);
  }
}
