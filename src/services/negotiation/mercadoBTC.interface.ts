interface PlaceOrderResponseType {
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
interface CurrencyBalanceType {
  available: string;
  total: string;
  amount_open_orders?: number;
}
interface AccountInfoDataType {
  balance: {
    bch: CurrencyBalanceType;
    brl: CurrencyBalanceType;
    btc: CurrencyBalanceType;
    eth: CurrencyBalanceType;
    ltc: CurrencyBalanceType;
    xrp: CurrencyBalanceType;
    mbprk01: CurrencyBalanceType;
    mbprk02: CurrencyBalanceType;
    mbprk03: CurrencyBalanceType;
    mbprk04: CurrencyBalanceType;
    mbcons01: CurrencyBalanceType;
    usdc: CurrencyBalanceType;
  };
  withdrawal_limits: {
    bch: CurrencyBalanceType;
    brl: CurrencyBalanceType;
    btc: CurrencyBalanceType;
    eth: CurrencyBalanceType;
    ltc: CurrencyBalanceType;
    xrp: CurrencyBalanceType;
  };
}
interface AccountInfoResponseType {
  response_data: AccountInfoDataType;
  status_code: number;
  server_unix_timestamp: string;
}
