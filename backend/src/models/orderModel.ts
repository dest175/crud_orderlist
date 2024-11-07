import { v4 as uuidv4 } from 'uuid';

export interface Order {
  id: string;
  customer_name: string;
  item: string;
  quantity: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: Date;
}

export const orders: Order[] = [];
