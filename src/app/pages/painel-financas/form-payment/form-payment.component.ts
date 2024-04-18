import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-form-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './form-payment.component.html',
  styleUrl: './form-payment.component.scss'
})
export class FormPaymentComponent {

}
