import api from "../../configs/axios.config";
import tapiEnum from "./tapi.enum";

import examples from "./examples";
let nounce: number = 1;
const placeOrder = async (
  callback,
  coin_pair: string,
  quantity: number,
  limit_price: number,
  type: string
) => {
  const params = {
    coin_pair: coin_pair,
    quantity: quantity,
    limit_price: limit_price,
    tapi_method: tapiEnum[type],
    tapi_nounce: nounce,
  };
  nounce++;
  console.log(`${type} OPERATION PARAMS: ${JSON.stringify(params)}`);

  return callback(examples.orderResponse.response_data.order);
};

const getAccountInfo = async (callback, type: string) => {
  const params = {
    tapi_method: tapiEnum[type],
    tapi_nounce: nounce,
  };
  nounce++;
  console.log(`GET ACCOUNT INFO OPERATION PARAMS: ${JSON.stringify(params)}`);

  return callback(examples.accountResponse.response_data);
};

export default { placeOrder, getAccountInfo };
