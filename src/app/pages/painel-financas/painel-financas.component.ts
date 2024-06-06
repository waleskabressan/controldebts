import { Component, OnInit, } from '@angular/core';
import { PainelFinancasService } from '../../services/painel-financas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { Payment } from '../../type/payment.type';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormPaymentComponent } from './form-payment/form-payment.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-painel-financas',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatOptionModule, NgxMaskDirective, NgxMaskPipe, MatDialogModule, ],
  templateUrl: './painel-financas.component.html',
  styleUrls: ['./painel-financas.component.scss']
})


export class PainelFinancasComponent implements OnInit {
  newPayment: Payment = {id: '', status: '', description: '',price: '',};
  isEditMode = false;
  payments: Payment[] = [];
  editedPayment: Payment | null = null;
  displayedColumns: string[] = ['description', 'price', 'date', 'action'];
  selectedStatus: string = 'All';
  paymentStatusOptions: string [] = ['All', 'toPay', 'paid'];
  totalFiltered: number = 0;
  statusTraduzido : { [key: string]: string } ={
    'toPay' : 'Aguardando Pagamento',
    'paid' : 'Pago',
    'All' : 'Todos'
  }

  constructor(private paymentsService: PainelFinancasService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadPayments();
  }
  
  addNewDebt() {
      const modal =  this.dialog.open(FormPaymentComponent, {
      data: {
        id: '',
        status: '',
        description: '',
        price: '',
        date: new Date(),
      }

      
    });
    modal.afterClosed().subscribe(result => {
      if(result == 'sucesso' ){
        this.loadPayments();
      }
    });
  }

  loadPayments(): void{
    const allPayments = this.paymentsService.getPayments();
    if (this.selectedStatus === 'All') {
      this.payments = allPayments;
    } else {
      this.payments = allPayments.filter(payment => payment.status === this.selectedStatus);
    }
    this.totalFiltered = this.calculateTotalFiltered();
  }
  
  
  deletePayment(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.paymentsService.deletePayment(id);
        this.loadPayments();
      }
    });
    
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
    this.loadPayments();
  }
  
  calculateTotal(): number {
    const allPayments = this.paymentsService.getPayments();
    return allPayments.reduce((total, payment) => total + Math.abs(parseFloat(payment.price)), 0);
  }
  calculateTotalFiltered(): number {
    return this.payments.reduce((total, payment) =>total + Math.abs(parseFloat(payment.price)), 0);
  }

  
}

