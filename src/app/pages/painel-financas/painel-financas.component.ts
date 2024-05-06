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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

enum PaymentStatuses {
  TOPAY = 'toPay',
  PAID = 'paid'
}

@Component({
  selector: 'app-painel-financas',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatOptionModule],
  templateUrl: './painel-financas.component.html',
  styleUrls: ['./painel-financas.component.scss']
})


export class PainelFinancasComponent implements OnInit {
  isEditMode = false;
  payments: Payment[] = [];
  editedPayment: Payment | null = null;
  displayedColumns: string[] = ['description', 'price', 'date', 'action'];
  selectedStatus: string = 'All';
  paymentStatusOptions: string [] = ['All', 'Topay', 'paid'];
  totalFiltered: number = 0;
  totalToPay: number = 0;
  totalPaid: number = 0;
  difference: number = 0;

  constructor(private paymentsService: PainelFinancasService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadPayments();
  }
  addNewDebt() {
    const modal =  this.dialog.open(FormPaymentComponent, {
      width: '250px',
      data: {
        id: '',
        status: '',
        description: '',
        price: '',
        date: new Date(),
      }
    });
    
    modal.afterClosed().subscribe(result => {
      if(result == 'sucesso'){
        this.loadPayments();
      }
    });
  }

  loadPayments(): void{
    this.payments = this.paymentsService.getPayments();
  }
  
  deletePayment(id: string): void {
    this.paymentsService.deletePayment(id);
    this.loadPayments();
  }

  async editPayment(payment: Payment): Promise<void> {
    const modal = this.dialog.open(FormPaymentComponent, {
      data: {
        id: payment.id,
        description: payment.description,
        status: payment.status,
        price: payment.price,
        data: payment.date,
      }
    });

    modal.afterClosed().subscribe(result => {
      if(result == 'sucesso'){
        this.loadPayments();
      }
    });
  }

  
  applyFilter(): void {
    if (this.selectedStatus === 'All') {
      this.loadPayments();
      this.totalFiltered = this.calculateTotal();
    } else {
      const payments = this.paymentsService.getPayments();
      this.payments = payments.filter(payment => payment.status.toLowerCase() === this.selectedStatus.toLowerCase());
      this.totalFiltered = this.calculateTotalFiltered();
    }
  }
  
  calculateTotal(): number {
    const allPayments = this.paymentsService.getPayments();
    return allPayments.reduce((total, payment) => total + parseFloat(payment.price), 0);
  }
  calculateTotalFiltered(): number {
    return this.payments.reduce((total, payment) => total + parseFloat(payment.price), 0);
  }

  
}
