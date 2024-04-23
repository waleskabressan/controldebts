import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Payment} from '../../../type/payment.type';
import { PainelFinancasService } from '../../../services/painel-financas.service';

export interface DialogData {
  price: string
  description: string 
}

@Component({
  selector: 'app-form-payment', 
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,MatButtonModule], 
  providers: [provideNativeDateAdapter()],
  templateUrl: './form-payment.component.html',
  styleUrl: './form-payment.component.scss'
})
export class FormPaymentComponent implements OnInit {
  price: string = '';
  description: string = '';
  payments: Payment[] = [];
  editedPayment: Payment | null = null;
  displayedColumns: string[] = ['id', 'description', 'price', 'date', 'action'];

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private paymentsService: PainelFinancasService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { price: this.price, description: this.description },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.description = result;
    });
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
    this.loadPayments();
  }
  addNewDebt() {
    this.dialog.open(FormPaymentComponent, {
      width: '250px',
    });
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

export class DatepickerOverviewExample {}

export class DialogOverviewExample {
}

export class DialogOverviewExampleDialog {
}