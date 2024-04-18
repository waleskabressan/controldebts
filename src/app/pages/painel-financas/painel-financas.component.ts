import { Component, OnInit } from '@angular/core';
import { PainelFinancasService } from '../../services/painel-financas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-painel-financas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './painel-financas.component.html',
  styleUrls: ['./painel-financas.component.scss']
})
export class PainelFinancasComponent implements OnInit {
  payments: any[] = [];
  editedPayment: any = null;

  constructor(private paymentsService: PainelFinancasService) { }

  ngOnInit(): void {
    this.loadPayments();
  }
  addNewDebt() {
    this.editedPayment = {
      id: this.payments.length + 1,
      status: '',
      description: '',
      price: '',
      date: ''
    };
  }
  
  saveNewDebt() {
    if (this.editedPayment.status && this.editedPayment.description && this.editedPayment.price && this.editedPayment.date) {
      this.paymentsService.createPayment(this.editedPayment);
      this.editedPayment = null;
      this.loadPayments();
    } else {
      console.log('Por favor, preencha todos os campos.');
    }
  }
  
  cancelNewDebt() {
    this.editedPayment = null;
  }

  loadPayments(): void{
    this.payments = this.paymentsService.getPayments();
  }
  
  deletePayment(id: number): void {
    this.paymentsService.deletePayment(id);
    this.loadPayments();
  }

  editPayment(payment: any): void {
    this.editedPayment = { ...payment }; // Faz uma cópia do pagamento para evitar modificar diretamente o original
  }

  saveEditedPayment(): void {
    if (this.editedPayment) {
      this.paymentsService.updatePayment(this.editedPayment);
      this.editedPayment = null; // Limpa o pagamento em edição
      this.loadPayments(); // Recarrega os pagamentos após a edição
    }
  }

  cancelEdit(): void {
    this.editedPayment = null; // Cancela a edição ao limpar o pagamento em edição
  }
  
}
