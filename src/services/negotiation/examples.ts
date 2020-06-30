const orderResponse = {
  response_data: {
    order: {
      order_id: 3,
      coin_pair: "BRLBTC",
      order_type: 1,
      status: 4,
      has_fills: true,
      quantity: "1.00000000",
      limit_price: "900.00000",
      executed_quantity: "1.00000000",
      executed_price_avg: "900.00000",
      fee: "0.00300000",
      created_timestamp: "1453835329",
      updated_timestamp: "1453835329",
      operations: [
        {
          operation_id: 1,
          quantity: "1.00000000",
          price: "900.00000",
          fee_rate: "0.30",
          executed_timestamp: "1453835329",
        },
      ],
    },
  },
  status_code: 100,
  server_unix_timestamp: "1453835329",
};
const accountResponse = {
  response_data: {
    balance: {
      bch: {
        available: "5.00000000",
        total: "6.00000000",
        amount_open_orders: 1,
      },
      brl: {
        available: "3000.00000",
        total: "4900.00000",
      },
      btc: {
        available: "10.00000000",
        total: "11.00000000",
        amount_open_orders: 3,
      },
      eth: {
        available: "490.00000000",
        total: "500.00000000",
        amount_open_orders: 1,
      },
      ltc: {
        available: "500.00000000",
        total: "500.00000000",
        amount_open_orders: 0,
      },
      xrp: {
        available: "105.00000000",
        total: "106.00000000",
        amount_open_orders: 0,
      },
      mbprk01: {
        available: "200.00000000",
        total: "208.00000000",
      },
      mbprk02: {
        available: "200.00000000",
        total: "208.00000000",
      },
      mbprk03: {
        available: "200.00000000",
        total: "208.00000000",
      },
      mbprk04: {
        available: "200.00000000",
        total: "208.00000000",
      },
      mbcons01: {
        available: "200.00000000",
        total: "208.00000000",
      },
      usdc: {
        available: "200.00000000",
        total: "208.00000000",
      },
    },
    withdrawal_limits: {
      bch: {
        available: "2.00000000",
        total: "2.00000000",
      },
      brl: {
        available: "988.00",
        total: "20000.00",
      },
      btc: {
        available: "3.76600000",
        total: "5.00000000",
      },
      eth: {
        available: "210.00000000",
        total: "300.00000000",
      },
      ltc: {
        available: "500.00000000",
        total: "500.00000000",
      },
      xrp: {
        available: "100.00000000",
        total: "200.00000000",
      },
    },
  },
  status_code: 100,
  server_unix_timestamp: "1453831028",
};
export default { orderResponse, accountResponse };
