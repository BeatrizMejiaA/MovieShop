import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss'],
})
export class PartnerComponent {

  constructor(private router: Router) {}

  becomePartner() {
    this.router.navigate(['/partner-sign-up']);
  }
}
