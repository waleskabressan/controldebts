import { Injectable } from '@angular/core';
import { Payment } from '../type/payment.type';

@Injectable({
  providedIn: 'root'
})
export class PainelFinancasService {
  private storageKey = 'payments';
  constructor() { }

  
  getPayments(): Payment[] {
    const paymentString = localStorage.getItem(this.storageKey);
    return paymentString ? JSON.parse (paymentString) : [];
  }
  createPayment(payment: any) : void{
    const payments = this.getPayments();
    payment.id = payments.length;
    payments.push(payment); 
    localStorage.setItem(this.storageKey, JSON.stringify(payments));
  }

  updatePayment(updatedPayment: Payment): void {
    const payments = this.getPayments();
    //percorre todos os itens do array (tipo um for) e retorna um array alterando as informações, funciona assim: 
        // for (let count = 0; count < payments.length; count++){
        //   const payment = payments[count]
    const newArrayPayments = payments.map((payment) => {
      if(payment.id == updatedPayment.id){
        return updatedPayment
      }else{
        return payment
      }
    })
    localStorage.setItem(this.storageKey, JSON.stringify(newArrayPayments))
  }
  

  deletePayment(id: number): void {
    let payments = this.getPayments();
    payments = payments.filter(payment => payment.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(payments));
  }

  editPayment(updatedPayment: any): any {
    const payments = this.getPayments();
    const index = payments.findIndex(payment => payment.id === updatedPayment.id);
    if (index !== -1) {
      payments[index] = updatedPayment;
      localStorage.setItem(this.storageKey, JSON.stringify(payments));
      return payments[index];
    }
    return null;
  }

  initializeData(): void{
    const initialData = [
      {
        "id": 1,
        "status": "paid",
        "description": "Practical Frozen Shoes",
        "price": "184.00",
        "date": "2024-03-09T15:03:06.239Z"
      },
      {
        "id": 2,
        "status": "toPay",
        "description": "Generic Cotton Fish",
        "price": "772.00",
        "date": "2024-03-13T00:25:45.073Z"
      },
      {
        "id": 3,
        "status": "toPay",
        "description": "Licensed Plastic Hat",
        "price": "718.00",
        "date": "2024-03-21T03:30:59.589Z"
      },
      {
        "id": 4,
        "status": "toPay",
        "description": "Awesome Bronze Keyboard",
        "price": "598.00",
        "date": "2024-03-30T15:50:20.188Z"
      },
      {
        "id": 5,
        "status": "toPay",
        "description": "Intelligent Metal Pants",
        "price": "476.00",
        "date": "2024-03-14T09:37:23.906Z"
      },
      {
        "id": 6,
        "status": "paid",
        "description": "Small Rubber Pizza",
        "price": "813.00",
        "date": "2024-03-24T15:39:38.827Z"
      },
      {
        "id": 7,
        "status": "paid",
        "description": "Small Plastic Computer",
        "price": "194.00",
        "date": "2024-03-24T05:00:05.818Z"
      },
      {
        "id": 8,
        "status": "toPay",
        "description": "Elegant Steel Cheese",
        "price": "852.00",
        "date": "2024-03-14T14:07:48.141Z"
      },
      {
        "id": 9,
        "status": "paid",
        "description": "Generic Granite Shirt",
        "price": "89.00",
        "date": "2024-03-17T00:52:49.406Z"
      },
      {
        "id": 10,
        "status": "paid",
        "description": "Rustic Bronze Soap",
        "price": "64.00",
        "date": "2024-03-23T23:07:58.514Z"
      },
      {
        "id": 11,
        "status": "toPay",
        "description": "Modern Concrete Chips",
        "price": "145.00",
        "date": "2024-03-26T08:04:47.422Z"
      },
      {
        "id": 12,
        "status": "paid",
        "description": "Oriental Frozen Pizza",
        "price": "825.00",
        "date": "2024-03-03T23:26:22.027Z"
      },
      {
        "id": 13,
        "status": "paid",
        "description": "Refined Metal Chips",
        "price": "113.00",
        "date": "2024-03-25T11:25:48.394Z"
      },
      {
        "id": 14,
        "status": "paid",
        "description": "Recycled Soft Sausages",
        "price": "282.00",
        "date": "2024-03-28T16:51:06.824Z"
      },
      {
        "id": 15,
        "status": "toPay",
        "description": "Recycled Frozen Chicken",
        "price": "621.00",
        "date": "2024-03-25T12:04:49.235Z"
      },
      {
        "id": 16,
        "status": "toPay",
        "description": "Awesome Wooden Car",
        "price": "579.00",
        "date": "2024-03-27T23:23:45.731Z"
      },
      {
        "id": 17,
        "status": "toPay",
        "description": "Sleek Plastic Shirt",
        "price": "54.00",
        "date": "2024-03-21T11:56:53.817Z"
      },
      {
        "id": 18,
        "status": "paid",
        "description": "Generic Fresh Table",
        "price": "152.00",
        "date": "2024-03-12T22:56:33.165Z"
      }
    ];

    const existingData = this.getPayments();

    if(existingData.length == 0){
      localStorage.setItem(this.storageKey, JSON.stringify(initialData));
    }
  }

  getPaymentsByStatus(payments: Payment[], status: string): Payment [] {
    return payments.filter( payment  => payment.status === status);
  }
}