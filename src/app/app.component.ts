import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PainelFinancasService } from './services/painel-financas.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxMaskDirective, NgxMaskPipe],
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
