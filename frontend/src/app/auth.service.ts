import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(): void {
    // Simulate a login by setting the loggedIn state to true
    this.loggedIn.next(true);
    console.log('login');
  }

  logout(): void {
    // Simulate a logout by setting the loggedIn state to false
    this.loggedIn.next(false);
    console.log('logout');
  }
}
