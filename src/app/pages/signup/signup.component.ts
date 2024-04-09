import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginService } from '../../services/login.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService,
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl(
        '',
        [Validators.required, Validators.minLength(5)]
      ),
      email: new FormControl(
        '',
        [Validators.required, Validators.email]
      ),

      password: new FormControl(
        '',
        [Validators.required, Validators.minLength(8)]
      ),
      passwordConfirm: new FormControl(
        '',
        [Validators.required, Validators.minLength(8)]
      )
    })
  }

  submit() {
    this.loginService.signup( this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password).subscribe({
      next: () => {
        this.toastrService.success("Cadastro feito com sucesso"),
        this.navigate()
      },
      error: () => this.toastrService.error ("Erro inesperado! Tente novamente"),
    })
  }

  navigate() {
    this.router.navigate(["login"])
  }
}
