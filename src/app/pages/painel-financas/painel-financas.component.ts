import { Component, OnInit } from '@angular/core';
import { PainelFinancasService } from '../../services/painel-financas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { Payment } from '../../type/payment.type';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormPaymentComponent } from './form-payment/form-payment.component';

@Component({
  selector: 'app-painel-financas',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './painel-financas.component.html',
  styleUrls: ['./painel-financas.component.scss']
})
export class PainelFinancasComponent implements OnInit {
  payments: Payment[] = [];
  editedPayment: Payment | null = null;
  displayedColumns: string[] = ['id', 'description', 'price', 'date', 'action'];

  constructor(private paymentsService: PainelFinancasService, public dialog: MatDialog) { }

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
  
  save() {
    
    if (this.editedPayment?.status && this.editedPayment?.description && this.editedPayment?.price && this.editedPayment?.date) {
      if(this.editedPayment?.id){
        this.paymentsService.updatePayment(this.editedPayment)
      }else{
        
      }
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
    //this.editedPayment = { ...payment }; // Faz uma cópia do pagamento para evitar modificar diretamente o original
    this.dialog.open(FormPaymentComponent, {
      width: '250px',
    });
  }

  saveEditedPayment(): void {
    if (this.editPayment) {
      this.paymentsService.updatePayment(this.editPayment);
      this.editedPayment = null; // Limpa o pagamento em edição
      this.loadPayments(); // Recarrega os pagamentos após a edição
    }
  }

  cancelEdit(): void {
    this.editedPayment = null; // Cancela a edição ao limpar o pagamento em edição
  }
  
}
