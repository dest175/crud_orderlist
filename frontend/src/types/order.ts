export interface Order {
    id: string;
    customer_name: string;
    item: string;
    quantity: number;
    status: 'pending' | 'completed' | 'cancelled';
    created_at: string;
  }
  