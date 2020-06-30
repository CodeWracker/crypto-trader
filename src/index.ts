import "./configs/dotenv.config";
import getTaxValue from "./utils";
import mercadoBTCDataService from "./services/data/mercadoBTC";
import mercadoBTCNegotiationService from "./services/negotiation/mercadoBTC";
import { promisify } from "util";
import "./operation.interface";
import "./services/data/mercadoBTC.interface";
import "./services/negotiation/mercadoBTC.interface";
import { parse } from "path";

let nextOperation: OperationType = {
  type: "buy",
  value: null,
};
let operations: PlaceOrderResponseType[] = [];
let myAccount: AccountInfoDataType;
const acoountInfoCallback = (res: AccountInfoDataType) => {
  myAccount = res;
};
const buyCallback = (res: PlaceOrderResponseType) => {
  operations.push(res);
  nextOperation = {
    type: "sell",
    value:
      parseFloat(res.operations[0].price) +
      (parseFloat(res.operations[0].price) *
        parseFloat(res.operations[0].fee_rate)) /
        100,
  };
};
const sellCallback = (res: PlaceOrderResponseType) => {
  nextOperation = {
    type: "buy",
    value:
      parseFloat(res.operations[0].price) -
      (parseFloat(res.operations[0].price) *
        parseFloat(res.operations[0].fee_rate)) /
        100,
  };
};
const checkOperationValid = (type: string, value: number): boolean => {
  return true;
};
const operationMethods = {
  async buy(ticker: TickerType) {
    console.log("\nBUY");
    await mercadoBTCNegotiationService.getAccountInfo(
      acoountInfoCallback,
      "accountInfo"
    );
    await mercadoBTCNegotiationService.placeOrder(
      buyCallback,
      "BTCBRL",
      parseFloat(myAccount.balance.brl.available) / parseFloat(ticker.last),
      nextOperation.value ? nextOperation.value : parseFloat(ticker.last),
      "sell"
    );
  },
  sell() {
    console.log("\nSELL");
    mercadoBTCNegotiationService.placeOrder(
      sellCallback,
      "BRLBTC",
      parseFloat(myAccount.balance.btc.available),
      nextOperation.value,
      "sell"
    );
  },
};
const mainLoop = async () => {
  //console.log(operations);

  let ticker: TickerType;
  await mercadoBTCDataService.getTicker((resp: TickerType) => {
    ticker = resp;
  }, "BTC");
  console.log(`last: ${ticker.last}`);
  if (checkOperationValid(nextOperation.type, nextOperation.value)) {
    let op = operationMethods[nextOperation.type];
    op(ticker);
    console.log(`next operation type: ${nextOperation.type}`);
    console.log(`next operation value: ${nextOperation.value}`);
  }
  await setTimeOutPromise(5000);
  mainLoop();
};

const setTimeOutPromise = promisify(setTimeout);
let variation = getTaxValue(process.env.MIN_VARIATIN_BY_TAXES.split("/"));

mainLoop();
