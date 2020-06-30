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
  type: "BUY",
  value: null,
};
let operations: BuyResponseType[] = [];
const sell = () => {
  console.log("\nSELL");
  nextOperation = {
    type: "BUY",
    value: nextOperation.value,
  };
};
const buy = (ticker: TickerType) => {
  console.log("\nBuy");

  mercadoBTCNegotiationService.buyCrypto(
    buyCallback,
    "BRLBTC",
    parseFloat(ticker.last) / nextOperation.value,
    nextOperation.value //aqui é pra colocar todo o saldo da carteira
  );
};
const buyCallback = (res: BuyResponseType) => {
  operations.push(res);
  nextOperation = {
    type: "SELL",
    value:
      parseFloat(res.operations[0].price) +
      (parseFloat(res.operations[0].price) *
        parseFloat(res.operations[0].fee_rate)) /
        100,
  };
};
const mainLoop = async () => {
  //console.log(operations);

  let ticker: TickerType;
  await mercadoBTCDataService.getTicker((resp: TickerType) => {
    ticker = resp;
  }, "BTC");
  console.log(`last: ${ticker.last}`);
  nextOperation.value
    ? nextOperation.type === "BUY"
      ? buy(ticker)
      : sell()
    : buy(ticker);
  console.log(`next operation type: ${nextOperation.type}`);
  console.log(`next operation value: ${nextOperation.value}`);
  await setTimeOutPromise(1000);
  mainLoop();
};

const setTimeOutPromise = promisify(setTimeout);
let variation = getTaxValue(process.env.MIN_VARIATIN_BY_TAXES.split("/"));

mainLoop();
