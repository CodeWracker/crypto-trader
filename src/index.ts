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
const operationMethods = {
  async buy(ticker: TickerType) {
    console.log("\nBUY");
    await mercadoBTCNegotiationService.getAccountInfo(
      callbackMethods["accountInfo"],
      "accountInfo"
    );
    await mercadoBTCNegotiationService.placeOrder(
      callbackMethods[nextOperation.type],
      "BTCBRL",
      parseFloat(myAccount.balance.brl.available) / parseFloat(ticker.last),
      nextOperation.value ? nextOperation.value : parseFloat(ticker.last),
      nextOperation.type
    );
  },
  sell() {
    console.log("\nSELL");
    mercadoBTCNegotiationService.placeOrder(
      callbackMethods[nextOperation.type],
      "BRLBTC",
      parseFloat(myAccount.balance.btc.available),
      nextOperation.value,
      nextOperation.type
    );
  },
};
const callbackMethods = {
  accountInfo(res: AccountInfoDataType) {
    myAccount = res;
  },
  buy(res: PlaceOrderResponseType) {
    operations.push(res);
    nextOperation = {
      type: "sell",
      value:
        parseFloat(res.operations[0].price) +
        (parseFloat(res.operations[0].price) *
          (parseFloat(res.operations[0].fee_rate) + 1)) /
          100,
    };
  },
  sell(res: PlaceOrderResponseType) {
    nextOperation = {
      type: "buy",
      value:
        parseFloat(res.operations[0].price) -
        (parseFloat(res.operations[0].price) *
          (parseFloat(res.operations[0].fee_rate) + 1)) /
          100,
    };
  },
};

const checkOperationValid = (
  type: string,
  value: number,
  last: number
): boolean => {
  let response: boolean;
  !value
    ? (response = true)
    : type === "buy"
    ? (response = last <= value)
    : (response = last >= value);
  return response;
};

const mainLoop = async () => {
  //console.log(operations);

  let ticker: TickerType;
  await mercadoBTCDataService.getTicker((resp: TickerType) => {
    ticker = resp;
  }, "BTC");
  console.log(`last: ${ticker.last}`);
  console.log(`next op ${nextOperation.type}: ${nextOperation.value}`);

  if (
    checkOperationValid(
      nextOperation.type,
      nextOperation.value,
      parseFloat(ticker.last)
    )
  ) {
    let op = operationMethods[nextOperation.type];
    op(ticker);
    console.log(`next operation type: ${nextOperation.type}`);
    console.log(`next operation value: ${nextOperation.value}`);
  } else {
    console.log("Ainda não ta no ponto");
  }

  await setTimeOutPromise(5000);
  mainLoop();
};

const setTimeOutPromise = promisify(setTimeout);
let variation = getTaxValue(process.env.MIN_VARIATIN_BY_TAXES.split("/"));

mainLoop();
