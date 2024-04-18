import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PainelFinancasService } from './services/painel-financas.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{
  title = 'controldebts';
  constructor(private paymentService: PainelFinancasService){}

  ngOnInit(): void {
    this.paymentService.initializeData();
  }
}
