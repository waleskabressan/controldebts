
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { User } from '../type/user.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  login(email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') ?? '') || [];

    for (let cont = 0; cont < users.length; cont++) {
      if (email === users[cont].email) {
        if (password === users[cont].password) {
          localStorage.setItem('logged', JSON.stringify(users[cont]));
          return true;
        }
      }
    }
    return false;
  }

  signup(name: string, email: string, password: string) {
    // Recupera todos os usuários do localStorage
    const users: User[] = JSON.parse(localStorage.getItem('users') ??  '[]') || [];

    users.push({ name, email, password });

    // Salva os usuários no localStorage com o novo usuário
    localStorage.setItem('users', JSON.stringify(users));

    return 'ok';
  }

  logout() {
    localStorage.removeItem('logged');
    return;
  }
}