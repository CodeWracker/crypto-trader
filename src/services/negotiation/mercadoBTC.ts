import api from "../../configs/axios.config";

const exampleResponse = {
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

const buyCrypto = async (
  callback,
  coin_pair: string,
  quantity: number,
  limit_price: number
) => {
  const method = "place_buy_order";
  const params = {
    coin_pair: coin_pair,
    quantity: quantity,
    limit_price: limit_price,
    tapi_method: method,
  };
  console.log(`BUY OPERATION PARAMS: ${JSON.stringify(params)}`);

  return callback(exampleResponse.response_data.order);
};

export default { buyCrypto };
