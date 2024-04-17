import { Component, OnInit } from '@angular/core';
import { PainelFinancasService } from '../../services/painel-financas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-painel-financas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './painel-financas.component.html',
  styleUrls: ['./painel-financas.component.scss']
})
export class PainelFinancasComponent implements OnInit {
  payments: any[] = [];
  showForm: boolean = false;
  formData: any = {};

  constructor(private paymentsService: PainelFinancasService) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void{
    this.payments = this.paymentsService.getPayments();
  }
  
  deletePayment(id: number): void {
    this.paymentsService.deletePayment(id);
    this.loadPayments();
  }

  
}
