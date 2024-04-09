import { Component, OnInit } from '@angular/core';
import { PainelFinancasService } from '../../services/painel-financas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-painel-financas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './painel-financas.component.html',
  styleUrls: ['./painel-financas.component.scss']
})
export class PainelFinancasComponent implements OnInit {
  payments: any[] = [];

  constructor(private paymentsService: PainelFinancasService) { }

  ngOnInit(): void {
    this.paymentsService.getPayments().subscribe((data: any[]) => {
      this.payments = data;
      console.log(this.payments);
    });
  }
}
