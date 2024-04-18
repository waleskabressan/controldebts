import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginService } from '../../services/login.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(
        '',
        [Validators.required, Validators.email]
      ),

      password: new FormControl(
        '',
        [Validators.required, Validators.minLength(8)]
      )
    })
  }

  submit() {
    const isValidLogin = this.loginService.login(
      this.loginForm.value.email, 
      this.loginForm.value.password
    )
    if(isValidLogin){
      this.toastrService.success("Login feito com sucesso");
      this.router.navigate(["painel-financas"]);
    }else{
      this.toastrService.error ("Email ou senha incorretos!");
    }
     
  }

  navigate() {
    this.router.navigate(["signup"])
  }


}
