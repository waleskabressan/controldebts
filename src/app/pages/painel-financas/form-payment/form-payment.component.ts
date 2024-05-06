import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Payment} from '../../../type/payment.type';
import { PainelFinancasService } from '../../../services/painel-financas.service';
import { v4 as uuidv4 } from 'uuid';

export interface DialogData {
  id: string;
  price: string;
  description: string ;
  status: string;
  date: Date;
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
  payments: Payment[] = [];
  editedPayment: Payment | null = null;
  displayedColumns: string[] = ['id', 'description', 'price', 'date', 'action'];

  formPayment = new FormGroup({
    id: new FormControl<string>('-1'),
    date: new FormControl<Date>(new Date()),
    status: new FormControl<string>(''),
    price:  new FormControl<string>(''),
    description: new FormControl<string>('')
  })

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private paymentsService: PainelFinancasService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

   onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
    this.formPayment.patchValue({
      date: this.data.date ? this.data.date : new Date (),
      description: this.data.description,
      price: this.data.price,
      status: this.data.status,
      id: this.data.id
    })
  }
  addNewDebt() {
    this.dialog.open(FormPaymentComponent, {
      width: '250px',
    });
    this.editedPayment = {
      id:  '',
      status: '',
      description: '',
      price: '',
   
    };
  }
  
  save() {
    const value = this.formPayment.value
    if (value?.status && value?.description && value?.price && value?.date) {
      if(this.formPayment.value?.id){
        this.paymentsService.updatePayment(value as Payment)
      }else{
        this.paymentsService.createPayment({...value as Payment, id: null});
      }

      this.dialogRef.close('sucesso');
    } else {
      console.log('Por favor, preencha todos os campos.');
    }
  }
  
  cancelNewDebt() {
    this.editedPayment = null;
  }

  loadPayments(): void{
    const paymentsFromLocalStorage = JSON.parse(localStorage.getItem('payments') || '[]');
    this.payments = paymentsFromLocalStorage;
  }
  
  deletePayment(id: string): void {
    this.paymentsService.deletePayment(id);
    this.loadPayments();
  }

  editPayment(payment: Payment): void {
    this.dialog.open(FormPaymentComponent, {
      width: '250px',
    });
  }

  cancelEdit(): void {
    this.editedPayment = null; // Cancela a edição ao limpar o pagamento em edição
  }
  
}

export class DatepickerOverviewExample {}

export class DialogOverviewExample {
}

export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}