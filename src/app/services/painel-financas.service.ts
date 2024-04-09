import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PainelFinancasService {

  constructor() { }

  getPayments(): Observable<any[]>{
    return of([
          {
            "status": "paid",
            "description": "Practical Frozen Shoes",
            "price": "184.00",
            "date": "2024-03-09T15:03:06.239Z"
          },
          {
            "status": "toPay",
            "description": "Generic Cotton Fish",
            "price": "772.00",
            "date": "2024-03-13T00:25:45.073Z"
          },
          {
            "status": "toPay",
            "description": "Licensed Plastic Hat",
            "price": "718.00",
            "date": "2024-03-21T03:30:59.589Z"
          },
          {
            "status": "toPay",
            "description": "Awesome Bronze Keyboard",
            "price": "598.00",
            "date": "2024-03-30T15:50:20.188Z"
          },
          {
            "status": "toPay",
            "description": "Intelligent Metal Pants",
            "price": "476.00",
            "date": "2024-03-14T09:37:23.906Z"
          },
          {
            "status": "paid",
            "description": "Small Rubber Pizza",
            "price": "813.00",
            "date": "2024-03-24T15:39:38.827Z"
          },
          {
            "status": "paid",
            "description": "Small Plastic Computer",
            "price": "194.00",
            "date": "2024-03-24T05:00:05.818Z"
          },
          {
            "status": "toPay",
            "description": "Elegant Steel Cheese",
            "price": "852.00",
            "date": "2024-03-14T14:07:48.141Z"
          },
          {
            "status": "paid",
            "description": "Generic Granite Shirt",
            "price": "89.00",
            "date": "2024-03-17T00:52:49.406Z"
          },
          {
            "status": "paid",
            "description": "Rustic Bronze Soap",
            "price": "64.00",
            "date": "2024-03-23T23:07:58.514Z"
          },
          {
            "status": "toPay",
            "description": "Modern Concrete Chips",
            "price": "145.00",
            "date": "2024-03-26T08:04:47.422Z"
          },
          {
            "status": "paid",
            "description": "Oriental Frozen Pizza",
            "price": "825.00",
            "date": "2024-03-03T23:26:22.027Z"
          },
          {
            "status": "paid",
            "description": "Refined Metal Chips",
            "price": "113.00",
            "date": "2024-03-25T11:25:48.394Z"
          },
          {
            "status": "paid",
            "description": "Recycled Soft Sausages",
            "price": "282.00",
            "date": "2024-03-28T16:51:06.824Z"
          },
          {
            "status": "toPay",
            "description": "Recycled Frozen Chicken",
            "price": "621.00",
            "date": "2024-03-25T12:04:49.235Z"
          },
          {
            "status": "toPay",
            "description": "Awesome Wooden Car",
            "price": "579.00",
            "date": "2024-03-27T23:23:45.731Z"
          },
          {
            "status": "toPay",
            "description": "Sleek Plastic Shirt",
            "price": "54.00",
            "date": "2024-03-21T11:56:53.817Z"
          },
          {
            "status": "paid",
            "description": "Generic Fresh Table",
            "price": "152.00",
            "date": "2024-03-12T22:56:33.165Z"
          }
    ]);
  }
}
