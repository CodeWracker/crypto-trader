interface BuyResponseType {
  order_id: string;
  coin_pair: string;
  order_type: string;
  status: string;
  has_fills: boolean;
  quantity: string;
  limit_price: string;
  executed_quantity: string;
  executed_price_avg: string;
  fee: string;
  created_timestamp: string;
  updated_timestamp: string;
  operations: [
    {
      operation_id: string;
      quantity: string;
      price: string;
      fee_rate: string;
      executed_timestamp: string;
    }
  ];
}
