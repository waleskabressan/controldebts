import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PainelFinancasComponent } from './pages/painel-financas/painel-financas.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path: "", 
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path:"login",
        component: LoginComponent
    },
    {
        path:"signup",
        component: SignupComponent
    },
    {
        path:"painel-financas",
        component: PainelFinancasComponent, 
        canActivate: [AuthGuardService]
    }
];
