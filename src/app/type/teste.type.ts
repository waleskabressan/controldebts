import { Payment } from "./payment.type";

interface Teste<T> {
  a?: string;
  b?: number;
  c?: Date;
  d: T
}

const x: Teste<number> = {d: ''}

