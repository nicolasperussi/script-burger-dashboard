import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IAdmin } from '../../interfaces/admin.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  handleSubmit(): void {
    this.authService
      .loginUser({
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      })
      .subscribe((data: { token: string; user: IAdmin }) => {
        if (data?.token) {
          localStorage.setItem('@sb/token', data.token);
          localStorage.setItem('@sb/user', JSON.stringify(data.user));
          return window.location.replace('/');
        }
        // return console.log('Something went wrong with your login...');
      });
  }
}
