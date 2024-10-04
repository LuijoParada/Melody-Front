import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    const formData = new FormData();
    
    formData.append('email', this.email);
    formData.append('password', this.password);

    this.http.post(`http://localhost:8000/api/auth/login`, formData)
      .subscribe(
        response => console.log(response),

        error => console.log(error)
      );
    // If login successful, navigate to dashboard page
    this.router.navigate(['']);

  }

}
